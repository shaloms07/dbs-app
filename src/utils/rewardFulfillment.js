const REWARD_FULFILLMENT_OVERRIDES = {
  'reward-001': {
    fulfillmentType: 'coupon-link',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 30,
    requiresConfirmation: true,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://www.makemytrip.com/',
  },
  'reward-002': {
    fulfillmentType: 'coupon',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 7,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-003': {
    fulfillmentType: 'coupon-link',
    couponMode: 'dynamic',
    maxUseLimit: 3,
    renewAfterDays: 14,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://www.jiomart.com/',
  },
  'reward-004': {
    fulfillmentType: 'coupon',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 30,
    requiresConfirmation: true,
    confirmationPinRequired: false,
  },
  'reward-005': {
    fulfillmentType: 'offline',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 7,
    requiresConfirmation: true,
    confirmationPinRequired: false,
  },
  'reward-006': {
    fulfillmentType: 'link',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 30,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://www.igp.com/',
  },
  'reward-007': {
    fulfillmentType: 'coupon-pin',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 21,
    requiresConfirmation: true,
    confirmationPinRequired: true,
    confirmationPin: '4829',
    fulfillmentLink: 'https://www.puma.com/',
  },
  'reward-008': {
    fulfillmentType: 'offline',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 30,
    requiresConfirmation: true,
    confirmationPinRequired: false,
  },
  'reward-009': {
    fulfillmentType: 'coupon-link',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 30,
    requiresConfirmation: true,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://www.airindia.com/',
  },
  'reward-010': {
    fulfillmentType: 'coupon',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 7,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-011': {
    fulfillmentType: 'coupon',
    couponMode: 'dynamic',
    maxUseLimit: 3,
    renewAfterDays: 14,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-012': {
    fulfillmentType: 'link',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 30,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://www.sony.com/',
  },
  'reward-013': {
    fulfillmentType: 'coupon',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 21,
    requiresConfirmation: true,
    confirmationPinRequired: false,
  },
  'reward-014': {
    fulfillmentType: 'link',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 7,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://in.bookmyshow.com/',
  },
  'reward-015': {
    fulfillmentType: 'coupon-pin',
    couponMode: 'dynamic',
    maxUseLimit: 1,
    renewAfterDays: 30,
    requiresConfirmation: true,
    confirmationPinRequired: true,
    confirmationPin: '9264',
    fulfillmentLink: 'https://www.fnp.com/',
  },
  'reward-016': {
    fulfillmentType: 'link',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 30,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://www.nike.com/',
  },
  'reward-017': {
    fulfillmentType: 'online',
    couponMode: 'static',
    maxUseLimit: 3,
    renewAfterDays: 7,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-018': {
    fulfillmentType: 'coupon',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 7,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-019': {
    fulfillmentType: 'coupon-link',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 14,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://www.flipkart.com/',
  },
  'reward-020': {
    fulfillmentType: 'link',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 21,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://www2.hm.com/',
  },
  'reward-021': {
    fulfillmentType: 'offline',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 7,
    requiresConfirmation: true,
    confirmationPinRequired: false,
  },
  'reward-022': {
    fulfillmentType: 'coupon-link',
    couponMode: 'dynamic',
    maxUseLimit: 1,
    renewAfterDays: 14,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://example.com/pune-street',
  },
  'reward-023': {
    fulfillmentType: 'coupon',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 30,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-024': {
    fulfillmentType: 'online',
    couponMode: 'static',
    maxUseLimit: 5,
    renewAfterDays: 7,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-025': {
    fulfillmentType: 'offline',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 7,
    requiresConfirmation: true,
    confirmationPinRequired: false,
  },
  'reward-026': {
    fulfillmentType: 'coupon-link',
    couponMode: 'dynamic',
    maxUseLimit: 1,
    renewAfterDays: 14,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://example.com/bangalore-tech',
  },
  'reward-027': {
    fulfillmentType: 'offline',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 7,
    requiresConfirmation: true,
    confirmationPinRequired: false,
  },
  'reward-028': {
    fulfillmentType: 'coupon-link',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 14,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://example.com/ahmedabad-avenue',
  },
  'reward-029': {
    fulfillmentType: 'coupon',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 30,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-030': {
    fulfillmentType: 'link',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 30,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://example.com/karnataka-drive',
  },
  'reward-031': {
    fulfillmentType: 'offline',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 14,
    requiresConfirmation: true,
    confirmationPinRequired: false,
  },
  'reward-032': {
    fulfillmentType: 'online',
    couponMode: 'static',
    maxUseLimit: 5,
    renewAfterDays: 7,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-033': {
    fulfillmentType: 'coupon',
    couponMode: 'dynamic',
    maxUseLimit: 2,
    renewAfterDays: 7,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-034': {
    fulfillmentType: 'coupon',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 7,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-035': {
    fulfillmentType: 'link',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 14,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://example.com/mumbai-local',
  },
  'reward-036': {
    fulfillmentType: 'coupon-link',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 14,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://example.com/bengaluru-bazaar',
  },
  'reward-037': {
    fulfillmentType: 'offline',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 7,
    requiresConfirmation: true,
    confirmationPinRequired: false,
  },
  'reward-038': {
    fulfillmentType: 'coupon',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 30,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-039': {
    fulfillmentType: 'coupon',
    couponMode: 'dynamic',
    maxUseLimit: 2,
    renewAfterDays: 30,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-040': {
    fulfillmentType: 'link',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 30,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://example.com/karnataka-wheels',
  },
  'reward-041': {
    fulfillmentType: 'offline',
    couponMode: 'static',
    maxUseLimit: 1,
    renewAfterDays: 14,
    requiresConfirmation: true,
    confirmationPinRequired: false,
  },
  'reward-042': {
    fulfillmentType: 'coupon',
    couponMode: 'static',
    maxUseLimit: 2,
    renewAfterDays: 14,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-043': {
    fulfillmentType: 'online',
    couponMode: 'static',
    maxUseLimit: 5,
    renewAfterDays: 7,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-044': {
    fulfillmentType: 'online',
    couponMode: 'dynamic',
    maxUseLimit: 5,
    renewAfterDays: 7,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
  'reward-045': {
    fulfillmentType: 'coupon-link',
    couponMode: 'static',
    maxUseLimit: 3,
    renewAfterDays: 14,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://example.com/national-tech',
  },
  'reward-046': {
    fulfillmentType: 'link',
    couponMode: 'static',
    maxUseLimit: 3,
    renewAfterDays: 21,
    requiresConfirmation: false,
    confirmationPinRequired: false,
    fulfillmentLink: 'https://example.com/national-style',
  },
  'reward-047': {
    fulfillmentType: 'coupon',
    couponMode: 'static',
    maxUseLimit: 3,
    renewAfterDays: 30,
    requiresConfirmation: false,
    confirmationPinRequired: false,
  },
};

function clampInteger(value, minimum, maximum) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return minimum;
  return Math.max(minimum, Math.min(maximum, Math.round(numericValue)));
}

function normalizeBoolean(value) {
  return Boolean(value);
}

function deriveBaseFulfillment(reward) {
  if (reward?.locationScope === 'online') {
    return {
      fulfillmentType: 'online',
      couponMode: 'static',
      maxUseLimit: 5,
      renewAfterDays: 7,
      requiresConfirmation: false,
      confirmationPinRequired: false,
      confirmationPin: '',
      fulfillmentLink: '',
    };
  }

  if (reward?.redemptionType === 'deeplink') {
    return {
      fulfillmentType: 'link',
      couponMode: 'static',
      maxUseLimit: 2,
      renewAfterDays: 14,
      requiresConfirmation: false,
      confirmationPinRequired: false,
      confirmationPin: '',
      fulfillmentLink: '',
    };
  }

  return {
    fulfillmentType: reward?.locationScope === 'local' ? 'offline' : 'coupon',
    couponMode: 'static',
    maxUseLimit: reward?.locationScope === 'local' ? 1 : 2,
    renewAfterDays: reward?.locationScope === 'state' ? 30 : 14,
    requiresConfirmation: reward?.locationScope !== 'online',
    confirmationPinRequired: false,
    confirmationPin: '',
    fulfillmentLink: '',
  };
}

function buildDynamicCouponCode(reward, user) {
  const seed = `${reward?.id || 'reward'}:${user?.id || user?.mobile || user?.activeRegistrationNumber || 'guest'}`;
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  return `DYN-${hash.toString(36).toUpperCase().slice(0, 8)}`;
}

export function enrichRewardFulfillment(reward) {
  const base = deriveBaseFulfillment(reward);
  const override = REWARD_FULFILLMENT_OVERRIDES[reward?.id] ?? {};

  return {
    ...reward,
    ...base,
    ...override,
    maxUseLimit: clampInteger(override.maxUseLimit ?? base.maxUseLimit, 1, 99),
    renewAfterDays:
      override.renewAfterDays === null || override.renewAfterDays === undefined
        ? base.renewAfterDays
        : clampInteger(override.renewAfterDays, 1, 365),
    requiresConfirmation: normalizeBoolean(
      override.requiresConfirmation ?? base.requiresConfirmation
    ),
    confirmationPinRequired: normalizeBoolean(
      override.confirmationPinRequired ?? base.confirmationPinRequired
    ),
    confirmationPin: override.confirmationPin ?? base.confirmationPin ?? '',
    fulfillmentLink: override.fulfillmentLink ?? base.fulfillmentLink ?? '',
    couponMode: override.couponMode ?? base.couponMode,
    fulfillmentType: override.fulfillmentType ?? base.fulfillmentType,
  };
}

export function enrichRewardCatalog(rewards) {
  return (rewards ?? []).map(enrichRewardFulfillment);
}

export function getRewardFulfillmentLabel(reward) {
  const type = reward?.fulfillmentType || 'coupon';
  if (type === 'coupon-link') return 'Coupon + Link';
  if (type === 'coupon-pin') return 'Coupon + Pin';
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function getRewardCouponValue(reward, user) {
  if (reward?.couponMode === 'dynamic') {
    return buildDynamicCouponCode(reward, user);
  }

  return reward?.redemptionValue || reward?.couponCode || reward?.redemptionCode || 'TRCODE123';
}

export function getRewardFulfillmentSummary(reward, user) {
  return {
    fulfillmentLabel: getRewardFulfillmentLabel(reward),
    couponMode: reward?.couponMode || 'static',
    couponValue: getRewardCouponValue(reward, user),
    maxUseLimit: reward?.maxUseLimit ?? 1,
    renewAfterDays: reward?.renewAfterDays ?? null,
    requiresConfirmation: Boolean(reward?.requiresConfirmation),
    confirmationPinRequired: Boolean(reward?.confirmationPinRequired),
    confirmationPin: reward?.confirmationPin || '',
    fulfillmentLink: reward?.fulfillmentLink || '',
  };
}
