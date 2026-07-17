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

function mapOldToNewRedemptionMethod(fulfillmentType) {
  if (fulfillmentType === 'coupon' || fulfillmentType === 'Coupon') return 'Coupon';
  if (
    fulfillmentType === 'link' ||
    fulfillmentType === 'Link' ||
    fulfillmentType === 'online' ||
    fulfillmentType === 'Online'
  )
    return 'Link';
  if (fulfillmentType === 'coupon-link' || fulfillmentType === 'Coupon + Link')
    return 'Coupon + Link';
  if (fulfillmentType === 'coupon-pin' || fulfillmentType === 'Coupon + PIN') return 'Coupon + PIN';
  if (
    fulfillmentType === 'offline' ||
    fulfillmentType === 'confirmation-pin' ||
    fulfillmentType === 'Confirmation PIN'
  )
    return 'Confirmation PIN';
  return 'Coupon';
}

function mapOldLocationScopeToNationalLocal(locationScope) {
  if (locationScope === 'local' || locationScope === 'state' || locationScope === 'Local')
    return 'Local';
  return 'National';
}

function mapOldToOnlineOffline(fulfillmentType, locationScope) {
  if (locationScope === 'online' || locationScope === 'Online') return 'Online';
  if (
    fulfillmentType === 'offline' ||
    locationScope === 'local' ||
    fulfillmentType === 'Confirmation PIN'
  )
    return 'Offline';
  return 'Online';
}

function buildConfirmationPin(reward, user) {
  const seed = `${reward?.id || 'reward'}:${user?.id || user?.mobile || 'user'}:pin`;
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }
  return String(1000 + (hash % 9000));
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

  const maxUseLimit = clampInteger(override.maxUseLimit ?? base.maxUseLimit, 1, 99);
  const renewAfterDays =
    override.renewAfterDays === null || override.renewAfterDays === undefined
      ? base.renewAfterDays
      : clampInteger(override.renewAfterDays, 1, 365);
  const requiresConfirmation = normalizeBoolean(
    override.requiresConfirmation ?? base.requiresConfirmation
  );
  const confirmationPinRequired = normalizeBoolean(
    override.confirmationPinRequired ?? base.confirmationPinRequired
  );

  const rawMethod =
    override.redemptionMethod ??
    reward?.redemptionMethod ??
    override.fulfillmentType ??
    base.fulfillmentType;
  const redemptionMethod = mapOldToNewRedemptionMethod(rawMethod);

  const rawCouponType =
    override.couponType ?? reward?.couponType ?? override.couponMode ?? base.couponMode;
  const couponType =
    rawCouponType === 'dynamic' || rawCouponType === 'Dynamic' ? 'Dynamic' : 'Static';

  const nationalLocal =
    override.nationalLocal ??
    reward?.nationalLocal ??
    mapOldLocationScopeToNationalLocal(reward?.locationScope);
  const onlineOffline =
    override.onlineOffline ??
    reward?.onlineOffline ??
    mapOldToOnlineOffline(override.fulfillmentType ?? base.fulfillmentType, reward?.locationScope);

  const minimumDriverScore =
    override.minimumDriverScore ?? reward?.minimumDriverScore ?? reward?.minimumScore ?? 0;
  const validity = override.validity ?? reward?.validity ?? reward?.expiresAt ?? '';
  const offerStatus = override.offerStatus ?? reward?.offerStatus ?? reward?.status ?? 'Active';

  const couponCode =
    override.couponCode ??
    reward?.couponCode ??
    override.redemptionValue ??
    reward?.redemptionValue ??
    '';
  const redemptionLink =
    override.redemptionLink ??
    reward?.redemptionLink ??
    override.fulfillmentLink ??
    base.fulfillmentLink ??
    '';
  const redemptionPin =
    override.redemptionPin ??
    reward?.redemptionPin ??
    override.confirmationPin ??
    base.confirmationPin ??
    '';
  const confirmationPin =
    override.confirmationPin ?? reward?.confirmationPin ?? override.confirmationPin ?? '';

  const offerName = override.offerName ?? reward?.offerName ?? reward?.offerTitle ?? '';
  const partner = override.partner ?? reward?.partner ?? reward?.brand ?? '';
  const description = override.description ?? reward?.description ?? reward?.offerCondition ?? '';
  const termsAndConditions =
    override.termsAndConditions ?? reward?.termsAndConditions ?? reward?.offerCondition ?? '';
  const brandLogo = override.brandLogo ?? reward?.brandLogoUrl ?? reward?.brandLogo ?? '';
  const bannerImage = override.bannerImage ?? reward?.cardImageUrl ?? reward?.bannerImage ?? '';

  // Extract reward value
  let rewardValue = override.rewardValue ?? reward?.rewardValue ?? '';
  if (!rewardValue && offerName) {
    const match = offerName.match(/worth\s+Rs\s+\d+|Rs\s+\d+\s+off|Free\s+\w+/i);
    rewardValue = match ? match[0] : 'Exclusive Benefit';
  }

  const enriched = {
    ...reward,
    ...base,
    ...override,

    // Future-Ready Data Model fields
    offerName,
    partner,
    category: reward?.category ?? '',
    description,
    rewardValue,
    redemptionMethod,
    couponType,
    couponCode,
    redemptionLink,
    redemptionPin,
    confirmationPin,
    nationalLocal,
    onlineOffline,
    minimumDriverScore,
    offerStatus,
    validity,
    termsAndConditions,
    brandLogo,
    bannerImage,

    // Backward Compatibility fields
    brand: partner,
    offerTitle: offerName,
    offerCondition: description,
    cardImageUrl: bannerImage,
    brandLogoUrl: brandLogo,
    expiresAt: validity,
    minimumScore: minimumDriverScore,
    fulfillmentType:
      redemptionMethod === 'Coupon'
        ? 'coupon'
        : redemptionMethod === 'Link'
          ? 'link'
          : redemptionMethod === 'Coupon + Link'
            ? 'coupon-link'
            : redemptionMethod === 'Coupon + PIN'
              ? 'coupon-pin'
              : 'offline',
    couponMode: couponType === 'Dynamic' ? 'dynamic' : 'static',
    fulfillmentLink: redemptionLink,
    maxUseLimit,
    renewAfterDays,
    requiresConfirmation,
    confirmationPinRequired,
  };

  return enriched;
}

export function enrichRewardCatalog(rewards) {
  return (rewards ?? []).map(enrichRewardFulfillment);
}

export function getRewardFulfillmentLabel(reward) {
  return (
    reward?.redemptionMethod || mapOldToNewRedemptionMethod(reward?.fulfillmentType || 'coupon')
  );
}

export function getRewardCouponValue(reward, user) {
  if (reward?.couponType === 'Dynamic' || reward?.couponMode === 'dynamic') {
    return buildDynamicCouponCode(reward, user);
  }

  return reward?.couponCode || reward?.redemptionValue || reward?.redemptionCode || 'TRCODE123';
}

export function getRewardFulfillmentSummary(reward, user) {
  const couponMode =
    reward?.couponType === 'Dynamic' || reward?.couponMode === 'dynamic' ? 'dynamic' : 'static';
  const couponValue = getRewardCouponValue(reward, user);
  const confPin =
    reward?.confirmationPin ||
    (reward?.redemptionMethod === 'Confirmation PIN' ? buildConfirmationPin(reward, user) : '');

  return {
    fulfillmentLabel: getRewardFulfillmentLabel(reward),
    couponMode,
    couponValue,
    maxUseLimit: reward?.maxUseLimit ?? 1,
    renewAfterDays: reward?.renewAfterDays ?? null,
    requiresConfirmation: Boolean(reward?.requiresConfirmation),
    confirmationPinRequired: Boolean(reward?.confirmationPinRequired),
    confirmationPin: confPin,
    redemptionPin: reward?.redemptionPin || '5821',
    fulfillmentLink: reward?.redemptionLink || reward?.fulfillmentLink || '',
  };
}
