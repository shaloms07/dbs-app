const DEFAULT_LOCATION_SCOPE = 'national';

function normalizeText(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeText).filter(Boolean);
  }

  if (typeof value === 'string') {
    return [normalizeText(value)].filter(Boolean);
  }

  return [];
}

export function getUserResidenceLocation(user) {
  const residenceCity =
    user?.residenceCity || user?.city || user?.location?.city || user?.profile?.city || '';
  const residenceState =
    user?.residenceState || user?.state || user?.location?.state || user?.profile?.state || '';

  return {
    city: normalizeText(residenceCity),
    state: normalizeText(residenceState),
  };
}

export function getRewardLocationScope(reward) {
  return (
    normalizeText(reward?.locationScope || reward?.scope || DEFAULT_LOCATION_SCOPE) ||
    DEFAULT_LOCATION_SCOPE
  );
}

export function isRewardVisibleToUser(reward, user) {
  const scope = getRewardLocationScope(reward);
  const { city, state } = getUserResidenceLocation(user);
  const availableCities = normalizeList(reward?.availableCities ?? reward?.cities ?? reward?.city);
  const availableStates = normalizeList(reward?.availableStates ?? reward?.states ?? reward?.state);

  if (scope === 'online' || scope === 'national') {
    return true;
  }

  if (scope === 'local') {
    if (!city) {
      return false;
    }

    return availableCities.includes(city);
  }

  if (scope === 'state') {
    if (!state) {
      return false;
    }

    return availableStates.includes(state);
  }

  return true;
}

export function filterRewardsByLocation(rewards, user) {
  return (rewards ?? []).filter((reward) => isRewardVisibleToUser(reward, user));
}
