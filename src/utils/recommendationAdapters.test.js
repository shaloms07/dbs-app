import { describe, expect, it } from 'vitest';
import {
  buildRecommendationProfile,
  mapOfferToRecommendationOffer,
} from './recommendationAdapters';
import { mockUser } from '@data/mockUser';
import { mockScore } from '@data/mockScore';
import { mockRewards } from '@data/mockRewards';

describe('recommendationAdapters', () => {
  it('builds a recommendation profile from the existing mock user and score', () => {
    const profile = buildRecommendationProfile(mockUser, mockScore);

    expect(profile.pointBalance).toBe(mockScore.current);
    expect(profile.interests).toHaveProperty('travel');
    expect(profile.interests).toHaveProperty('food');
    expect(profile.completionRates).toEqual({});
  });

  it('maps a reward into the recommendation engine shape', () => {
    const mapped = mapOfferToRecommendationOffer(mockRewards[0]);

    expect(mapped.categories).toMatchObject({
      [mockRewards[0].category]: 1,
      flight: 1,
      hotel: 1,
    });
    expect(mapped.points).toBeGreaterThan(0);
    expect(mapped.effort).toBeGreaterThan(0);
    expect(mapped.cost).toBe(0);
    expect(mapped.type).toBe(mockRewards[0].redemptionType);
  });
});
