import { useEffect, useState } from 'react';
import {
  getDefaultInteractionProfile,
  getRewardInteractionProfile,
  trackRewardInteraction,
  clearRewardInteractions,
} from '@utils/rewardInteractions';

export function useRewardInteractions(user) {
  const [interactionProfile, setInteractionProfile] = useState(getDefaultInteractionProfile());

  useEffect(() => {
    let mounted = true;

    (async () => {
      const nextProfile = await getRewardInteractionProfile(user);
      if (mounted) {
        setInteractionProfile(nextProfile);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [user]);

  const trackInteraction = async (offer, action = 'click') => {
    const nextProfile = await trackRewardInteraction(user, offer, action);
    setInteractionProfile(nextProfile);
    return nextProfile;
  };

  const resetInteractions = async () => {
    const nextProfile = await clearRewardInteractions(user);
    setInteractionProfile(nextProfile);
    return nextProfile;
  };

  return {
    interactionProfile,
    trackInteraction,
    resetInteractions,
  };
}
