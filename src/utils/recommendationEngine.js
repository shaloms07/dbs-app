const DEFAULT_LIKELIHOOD = 0.5;
const DEFAULT_URGENCY = 0.1;

function clamp01(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function toNumericVector(input = {}) {
  return Object.entries(input).reduce((vector, [key, value]) => {
    const numericValue = Number(value);
    if (Number.isFinite(numericValue) && numericValue > 0) {
      vector[key] = numericValue;
    }
    return vector;
  }, {});
}

function cosineSimilarity(left = {}, right = {}) {
  const leftVector = toNumericVector(left);
  const rightVector = toNumericVector(right);
  const keys = new Set([...Object.keys(leftVector), ...Object.keys(rightVector)]);

  let dotProduct = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (const key of keys) {
    const leftValue = leftVector[key] ?? 0;
    const rightValue = rightVector[key] ?? 0;
    dotProduct += leftValue * rightValue;
    leftMagnitude += leftValue * leftValue;
    rightMagnitude += rightValue * rightValue;
  }

  if (!leftMagnitude || !rightMagnitude) {
    return 0;
  }

  return clamp01(dotProduct / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude)));
}

function resolveHoursRemaining(expiresAt) {
  if (typeof expiresAt === 'number') {
    return expiresAt;
  }

  if (typeof expiresAt === 'string') {
    const parsedDate = new Date(expiresAt);
    if (Number.isNaN(parsedDate.getTime())) {
      const parsedNumber = Number(expiresAt);
      return Number.isFinite(parsedNumber) ? parsedNumber : null;
    }

    return (parsedDate.getTime() - Date.now()) / (1000 * 60 * 60);
  }

  return null;
}

export function relevanceScore(userInterests, offerCategories) {
  return cosineSimilarity(userInterests, offerCategories);
}

export function urgencyScore(expiresAt) {
  const hoursRemaining = resolveHoursRemaining(expiresAt);

  if (!Number.isFinite(hoursRemaining)) {
    return DEFAULT_URGENCY;
  }

  if (hoursRemaining <= 0) {
    return DEFAULT_URGENCY;
  }

  if (hoursRemaining <= 6) return 1.0;
  if (hoursRemaining <= 24) return 0.7;
  if (hoursRemaining <= 72) return 0.4;
  return DEFAULT_URGENCY;
}

export function valueRatioScore(points, effort) {
  const numericPoints = Number(points);
  const numericEffort = Number(effort);

  if (!Number.isFinite(numericPoints) || numericPoints < 0) {
    return 0.2;
  }

  const safeEffort = Number.isFinite(numericEffort) && numericEffort > 0 ? numericEffort : 1;
  return clamp01(Math.min(1, numericPoints / (safeEffort * 10)));
}

export function likelihoodScore(userCompletionRates, offerType) {
  if (!offerType) {
    return DEFAULT_LIKELIHOOD;
  }

  const normalizedType = String(offerType).toLowerCase();
  const rates = userCompletionRates ?? {};
  const rate =
    rates[offerType] ??
    rates[normalizedType] ??
    rates[String(offerType).toUpperCase()] ??
    rates[String(offerType).trim()];

  if (!Number.isFinite(Number(rate))) {
    return DEFAULT_LIKELIHOOD;
  }

  return clamp01(Number(rate));
}

export function affordabilityScore(userPointBalance, offerCost) {
  const balance = Number(userPointBalance);
  const cost = Number(offerCost);

  if (!Number.isFinite(cost) || cost <= 0) {
    return 1.0;
  }

  if (!Number.isFinite(balance)) {
    return 0;
  }

  return balance >= cost ? 1.0 : 0.0;
}

export function calculateOfferScore(offer, userProfile) {
  const relevance = relevanceScore(userProfile?.interests, offer?.categories);
  const urgency = urgencyScore(offer?.expiresAt);
  const valueRatio = valueRatioScore(offer?.points, offer?.effort);
  const likelihood = likelihoodScore(userProfile?.completionRates, offer?.type);
  const affordability = affordabilityScore(userProfile?.pointBalance, offer?.cost);

  return (
    relevance * 0.35 + urgency * 0.25 + valueRatio * 0.2 + likelihood * 0.15 + affordability * 0.05
  );
}

export function generateRecommendedFeed(offers, userProfile, topN = 10) {
  return (offers ?? [])
    .map((offer, index) => {
      const score = calculateOfferScore(offer, userProfile);
      return { offer, score, index };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.index - right.index;
    })
    .slice(0, topN)
    .map(({ offer, score }) => ({ ...offer, score }));
}
