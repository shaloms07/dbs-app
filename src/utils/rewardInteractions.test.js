import { beforeEach, describe, expect, it } from 'vitest';
import { mockRewards } from '@data/mockRewards';
import { buildRecommendationProfile } from './recommendationAdapters';
import {
  clearRewardInteractions,
  getRewardInteractionProfile,
  trackRewardInteraction,
} from './rewardInteractions';

const user = {
  id: 'user-123',
  activeRegistrationNumber: 'MH31AB1234',
};

describe('rewardInteractions', () => {
  beforeEach(async () => {
    await clearRewardInteractions(user);
  });

  it('persists clicks and boosts related categories', async () => {
    await trackRewardInteraction(user, mockRewards[0], 'click');
    const profile = await getRewardInteractionProfile(user);

    expect(profile.clickedOfferIds).toContain(mockRewards[0].id);
    expect(profile.categoryAffinity[mockRewards[0].category]).toBeGreaterThan(0);

    const similarOfferIds = mockRewards[0].similarOfferIds || [];
    similarOfferIds.forEach((id) => {
      const offer = mockRewards.find((r) => r.id === id);
      if (offer && offer.category) {
        expect(profile.categoryAffinity[offer.category]).toBeGreaterThan(0);
      }
    });

    const recommendationProfile = buildRecommendationProfile(
      { id: user.id, activeRegistrationNumber: user.activeRegistrationNumber },
      { current: 240, band: 'Responsible', recentTrend: 'Stable' },
      profile
    );

    expect(recommendationProfile.interests.travel).toBeGreaterThan(0);
    expect(recommendationProfile.interactionProfile.clickedOfferIds).toContain(mockRewards[0].id);
  });

  it('stores redemption completion rates by offer type', async () => {
    await trackRewardInteraction(user, mockRewards[1], 'redeem');
    const profile = await getRewardInteractionProfile(user);

    expect(profile.redeemedOfferIds).toContain(mockRewards[1].id);
    expect(profile.completionRatesByType.code).toBeGreaterThan(0);
  });
});
