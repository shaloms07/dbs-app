const CATEGORY_VECTOR_KEYS = [
  'travel',
  'food',
  'grocery',
  'electronics',
  'entertainment',
  'gifting',
  'fashion',
  'jewellery',
];

const BASE_INTERESTS = {
  travel: 0.32,
  food: 0.38,
  grocery: 0.36,
  electronics: 0.28,
  entertainment: 0.26,
  gifting: 0.22,
  fashion: 0.2,
  jewellery: 0.16,
};

const VEHICLE_INTERESTS = {
  'Private Car': {
    travel: 0.2,
    electronics: 0.14,
    gifting: 0.08,
    jewellery: 0.08,
    grocery: 0.05,
  },
  'Two Wheeler': {
    food: 0.16,
    grocery: 0.14,
    entertainment: 0.1,
    fashion: 0.14,
    travel: 0.07,
  },
  'Goods Vehicle': {
    grocery: 0.18,
    electronics: 0.08,
    travel: 0.05,
  },
};

const BAND_INTERESTS = {
  Exemplary: {
    travel: 0.12,
    electronics: 0.08,
    jewellery: 0.12,
    fashion: 0.08,
  },
  Responsible: {
    travel: 0.1,
    electronics: 0.06,
    gifting: 0.05,
  },
  Average: {
    food: 0.08,
    grocery: 0.1,
    entertainment: 0.05,
  },
  Marginal: {
    food: 0.08,
    grocery: 0.12,
    entertainment: 0.06,
  },
  'At Risk': {
    food: 0.14,
    grocery: 0.14,
    entertainment: 0.08,
  },
  'High Risk': {
    food: 0.16,
    grocery: 0.16,
    entertainment: 0.1,
  },
  'Serious Risk': {
    food: 0.18,
    grocery: 0.18,
    entertainment: 0.12,
  },
  'Chronic Violator': {
    food: 0.2,
    grocery: 0.2,
    entertainment: 0.14,
  },
  'Habitual Offender': {
    food: 0.22,
    grocery: 0.22,
    entertainment: 0.16,
  },
  'Extreme Risk': {
    food: 0.24,
    grocery: 0.24,
    entertainment: 0.18,
  },
};

const TREND_INTERESTS = {
  Up: {
    travel: 0.06,
    electronics: 0.05,
    gifting: 0.04,
  },
  Stable: {
    travel: 0.02,
    entertainment: 0.02,
  },
  Down: {
    food: 0.1,
    grocery: 0.1,
    entertainment: 0.05,
  },
};

function clampInterestWeight(value) {
  return Math.max(0, Math.min(1, value));
}

function parseCurrencyValue(value) {
  if (typeof value !== 'string') return null;

  const match = value.match(/Rs\.?\s*([\d,]+(?:\.\d+)?)/i);
  if (!match) return null;

  const numericValue = Number(match[1].replace(/,/g, ''));
  return Number.isFinite(numericValue) ? numericValue : null;
}

function getActiveVehicle(user) {
  if (!user) return null;
  if (user.activeVehicle) return user.activeVehicle;

  const activeVehicleId = user.activeVehicleId;
  if (!activeVehicleId || !Array.isArray(user.vehicles)) return null;

  return (
    user.vehicles.find((vehicle) => vehicle.id === activeVehicleId) ?? user.vehicles[0] ?? null
  );
}

function getScoreBand(score) {
  return score?.band || score?.currentBand || score?.level || null;
}

function deriveInterests(user, score) {
  const interests = { ...BASE_INTERESTS };
  const activeVehicle = getActiveVehicle(user);
  const band = getScoreBand(score);
  const trend = score?.recentTrend || 'Stable';

  if (activeVehicle?.type && VEHICLE_INTERESTS[activeVehicle.type]) {
    for (const [category, weight] of Object.entries(VEHICLE_INTERESTS[activeVehicle.type])) {
      interests[category] = clampInterestWeight((interests[category] ?? 0) + weight);
    }
  }

  if (band && BAND_INTERESTS[band]) {
    for (const [category, weight] of Object.entries(BAND_INTERESTS[band])) {
      interests[category] = clampInterestWeight((interests[category] ?? 0) + weight);
    }
  }

  if (TREND_INTERESTS[trend]) {
    for (const [category, weight] of Object.entries(TREND_INTERESTS[trend])) {
      interests[category] = clampInterestWeight((interests[category] ?? 0) + weight);
    }
  }

  return Object.fromEntries(
    CATEGORY_VECTOR_KEYS.map((category) => [
      category,
      clampInterestWeight(interests[category] ?? 0),
    ])
  );
}

function deriveCompletionRates(user) {
  return {
    ...(user?.completionRates ?? user?.engagement?.completionRates ?? {}),
  };
}

function applyInteractionProfile(interests, completionRates, interactionProfile) {
  if (!interactionProfile) {
    return { interests, completionRates };
  }

  const nextInterests = { ...interests };
  const nextCompletionRates = { ...completionRates };

  for (const [category, weight] of Object.entries(interactionProfile.categoryAffinity ?? {})) {
    nextInterests[category] = clampInterestWeight(
      (nextInterests[category] ?? 0) + Number(weight || 0)
    );
  }

  for (const [type, rate] of Object.entries(interactionProfile.completionRatesByType ?? {})) {
    nextCompletionRates[type] = clampInterestWeight(
      Math.max(Number(nextCompletionRates[type] ?? 0), Number(rate || 0))
    );
  }

  return { interests: nextInterests, completionRates: nextCompletionRates };
}

function derivePointBalance(score) {
  const current = Number(score?.current);
  if (Number.isFinite(current)) {
    return current;
  }

  const fallback = Number(score?.points);
  return Number.isFinite(fallback) ? fallback : 0;
}

function deriveCategories(offer) {
  const categoryKeys = [];

  if (Array.isArray(offer?.categoryTags)) {
    categoryKeys.push(...offer.categoryTags);
  } else if (offer?.category) {
    categoryKeys.push(offer.category);
  }

  if (!categoryKeys.length) {
    categoryKeys.push('other');
  }

  return categoryKeys.reduce((vector, category) => {
    vector[category] = 1;
    return vector;
  }, {});
}

function deriveOfferPoints(offer) {
  const parsedFromTitle =
    parseCurrencyValue(offer?.offerTitle) ??
    parseCurrencyValue(offer?.offerCondition) ??
    parseCurrencyValue(offer?.redemptionValue);

  if (Number.isFinite(parsedFromTitle)) {
    return parsedFromTitle;
  }

  const pointsNeeded = Number(offer?.pointsNeeded);
  if (Number.isFinite(pointsNeeded) && pointsNeeded > 0) {
    return pointsNeeded * 10;
  }

  return 100;
}

function deriveOfferEffort(offer) {
  const minimumScore = Number(offer?.minimumScore);
  const pointsNeeded = Number(offer?.pointsNeeded);
  const referenceValue =
    Number.isFinite(minimumScore) && minimumScore > 0 ? minimumScore : pointsNeeded;

  if (!Number.isFinite(referenceValue) || referenceValue <= 0) {
    return 1;
  }

  return Math.max(1, Math.min(10, Math.round(referenceValue / 30)));
}

function deriveOfferCost(offer) {
  const pointsNeeded = Number(offer?.pointsNeeded);
  return Number.isFinite(pointsNeeded) ? pointsNeeded : 0;
}

export function buildRecommendationProfile(user, score, interactionProfile = null) {
  const baseInterests = deriveInterests(user, score);
  const baseCompletionRates = deriveCompletionRates(user);
  const mergedProfile = applyInteractionProfile(
    baseInterests,
    baseCompletionRates,
    interactionProfile
  );

  return {
    userId: user?.id ?? null,
    pointBalance: derivePointBalance(score),
    interests: mergedProfile.interests,
    completionRates: mergedProfile.completionRates,
    interactionProfile,
  };
}

export function mapOfferToRecommendationOffer(offer) {
  return {
    ...offer,
    categories: deriveCategories(offer),
    points: deriveOfferPoints(offer),
    effort: deriveOfferEffort(offer),
    cost: deriveOfferCost(offer),
    type: offer?.redemptionType || offer?.type || 'code',
  };
}

export function mapOffersToRecommendationOffers(offers) {
  return (offers ?? []).map(mapOfferToRecommendationOffer);
}
