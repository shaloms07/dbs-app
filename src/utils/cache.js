// Simple in-memory cache with TTL
const cache = new Map();

export function setCache(key, data, ttlMs) {
  const expiresAt = Date.now() + ttlMs;
  cache.set(key, {
    data,
    expiresAt,
  });
}

export function getCache(key) {
  const item = cache.get(key);

  if (!item) return null;

  // Check if expired
  if (item.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }

  return item.data;
}

export function clearCache(key) {
  cache.delete(key);
}

export function clearAllCache() {
  cache.clear();
}

// Cache keys
export const CACHE_KEYS = {
  SCORE: 'tr_cache_score',
  VIOLATIONS: 'tr_cache_violations',
  REWARDS: 'tr_cache_rewards',
  INSURANCE: 'tr_cache_insurance',
  USER: 'tr_cache_user',
};

// TTL durations (in milliseconds)
export const CACHE_TTL = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 1 * 60 * 60 * 1000, // 1 hour
  LONG: 24 * 60 * 60 * 1000, // 24 hours
};
