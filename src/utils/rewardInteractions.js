import initSqlJs from 'sql.js';
import { mockRewards } from '@data/mockRewards';

const STORAGE_KEY = 'tr_reward_interactions_sqlite_v1';
const MAX_RECENT_EVENTS = 25;
const memoryStorage = new Map();

const ACTION_WEIGHTS = {
  click: 0.08,
  view: 0.08,
  redeem: 0.18,
  dismiss: -0.04,
};

let sqlInitPromise = null;
let dbPromise = null;
const wasmUrl = new URL('../../node_modules/sql.js/dist/sql-wasm-browser.wasm', import.meta.url);

function getStorage() {
  if (typeof window !== 'undefined') {
    try {
      if (window.localStorage) {
        return window.localStorage;
      }
    } catch {
      // Fall through to in-memory storage for tests or restricted environments.
    }
  }

  return {
    getItem: (key) => memoryStorage.get(key) ?? null,
    setItem: (key, value) => {
      memoryStorage.set(key, value);
    },
    removeItem: (key) => {
      memoryStorage.delete(key);
    },
  };
}

function getUserKey(user) {
  return user?.id || user?.activeRegistrationNumber || user?.mobile || 'anonymous';
}

function toBase64(bytes) {
  let binary = '';
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }
  return btoa(binary);
}

function fromBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function getReadableWasmPath() {
  const pathname = wasmUrl.pathname;
  if (/^\/[A-Za-z]:/.test(pathname)) {
    return pathname.slice(1);
  }

  return pathname;
}

function createSchema(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS reward_interactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_key TEXT NOT NULL,
      offer_id TEXT NOT NULL,
      action TEXT NOT NULL,
      category TEXT,
      offer_type TEXT,
      related_offer_ids TEXT,
      occurred_at TEXT NOT NULL
    );
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_reward_interactions_user_key
    ON reward_interactions (user_key, occurred_at DESC);
  `);
}

async function getSqlModule() {
  if (!sqlInitPromise) {
    sqlInitPromise = initSqlJs({
      locateFile: () => (typeof window === 'undefined' ? getReadableWasmPath() : wasmUrl.href),
    });
  }

  return sqlInitPromise;
}

async function getDatabase() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const SQL = await getSqlModule();
      const storage = getStorage();
      const raw = storage.getItem(STORAGE_KEY);
      const db = raw ? new SQL.Database(fromBase64(raw)) : new SQL.Database();

      createSchema(db);
      persistDatabase(db);

      return db;
    })();
  }

  return dbPromise;
}

function persistDatabase(db) {
  const storage = getStorage();
  const bytes = db.export();
  storage.setItem(STORAGE_KEY, toBase64(bytes));
}

function normalizeOfferCategories(offer) {
  if (Array.isArray(offer?.categoryTags) && offer.categoryTags.length) {
    return offer.categoryTags;
  }

  if (offer?.category) {
    return [offer.category];
  }

  return [];
}

function addWeight(map, key, delta) {
  if (!key || !Number.isFinite(delta) || delta === 0) return;

  const nextValue = Math.max(0, Math.min(1, (Number(map[key]) || 0) + delta));
  map[key] = nextValue;
}

function bumpCategories(profile, categories, weight) {
  categories.forEach((category) => addWeight(profile.categoryAffinity, category, weight));
}

function findMockOffer(offerId) {
  return mockRewards.find((candidate) => candidate.id === offerId) ?? null;
}

function getOfferType(offer) {
  return offer?.redemptionType || offer?.type || 'code';
}

function getRelatedOfferIds(offer) {
  return Array.isArray(offer?.similarOfferIds) ? offer.similarOfferIds : [];
}

async function queryInteractions(user) {
  const db = await getDatabase();
  const statement = db.prepare(
    `
      SELECT offer_id, action, category, offer_type, related_offer_ids, occurred_at
      FROM reward_interactions
      WHERE user_key = ?
      ORDER BY occurred_at DESC, id DESC
    `
  );

  const rows = [];
  statement.bind([getUserKey(user)]);
  while (statement.step()) {
    rows.push(statement.getAsObject());
  }
  statement.free();

  return rows;
}

function buildDefaultProfile() {
  return {
    clickedOfferIds: [],
    redeemedOfferIds: [],
    dismissedOfferIds: [],
    recentEvents: [],
    categoryAffinity: {},
    completionRatesByType: {},
  };
}

function buildProfileFromRows(rows) {
  const profile = buildDefaultProfile();
  const typeCounts = {};
  const typeSuccesses = {};
  const clicked = new Set();
  const redeemed = new Set();
  const dismissed = new Set();

  rows.forEach((row) => {
    const action = row.action;
    const offerId = row.offer_id;
    const category = row.category || null;
    const offerType = row.offer_type || 'code';
    const relatedOfferIds = row.related_offer_ids ? JSON.parse(row.related_offer_ids) : [];
    const relatedOffers = relatedOfferIds.map(findMockOffer).filter(Boolean);
    const categories = category ? [category] : [];
    const weight = ACTION_WEIGHTS[action] ?? ACTION_WEIGHTS.click;

    profile.recentEvents.push({
      offerId,
      action,
      category,
      timestamp: row.occurred_at,
      relatedOfferIds,
    });

    if (action === 'click' || action === 'view') {
      clicked.add(offerId);
    } else if (action === 'redeem') {
      redeemed.add(offerId);
    } else if (action === 'dismiss') {
      dismissed.add(offerId);
    }

    bumpCategories(profile, categories, weight);
    relatedOffers.forEach((relatedOffer) => {
      bumpCategories(profile, normalizeOfferCategories(relatedOffer), weight / 2);
    });

    typeCounts[offerType] = (typeCounts[offerType] ?? 0) + 1;
    if (action === 'redeem') {
      typeSuccesses[offerType] = (typeSuccesses[offerType] ?? 0) + 1;
    }
  });

  profile.clickedOfferIds = [...clicked];
  profile.redeemedOfferIds = [...redeemed];
  profile.dismissedOfferIds = [...dismissed];
  profile.recentEvents = profile.recentEvents.slice(0, MAX_RECENT_EVENTS);

  for (const [type, count] of Object.entries(typeCounts)) {
    profile.completionRatesByType[type] = Math.max(
      0,
      Math.min(1, (typeSuccesses[type] ?? 0) / Math.max(1, count))
    );
  }

  return profile;
}

export function getInteractionStorageKey(user) {
  return `${STORAGE_KEY}:${getUserKey(user)}`;
}

export function getDefaultInteractionProfile() {
  return buildDefaultProfile();
}

export async function getRewardInteractionProfile(user) {
  const rows = await queryInteractions(user);
  return buildProfileFromRows(rows);
}

export async function clearRewardInteractions(user) {
  const db = await getDatabase();
  db.run('DELETE FROM reward_interactions WHERE user_key = ?', [getUserKey(user)]);
  persistDatabase(db);
  return getDefaultInteractionProfile();
}

export async function trackRewardInteraction(user, offer, action = 'click') {
  if (!offer?.id) {
    return getRewardInteractionProfile(user);
  }

  const db = await getDatabase();
  const normalizedAction = action in ACTION_WEIGHTS ? action : 'click';
  const relatedOfferIds = getRelatedOfferIds(offer);
  const category = offer.category || normalizeOfferCategories(offer)[0] || null;
  const offerType = getOfferType(offer);
  const occurredAt = new Date().toISOString();

  db.run(
    `
      INSERT INTO reward_interactions (
        user_key, offer_id, action, category, offer_type, related_offer_ids, occurred_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      getUserKey(user),
      offer.id,
      normalizedAction,
      category,
      offerType,
      JSON.stringify(relatedOfferIds),
      occurredAt,
    ]
  );

  persistDatabase(db);
  return getRewardInteractionProfile(user);
}
