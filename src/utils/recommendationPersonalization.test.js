import { describe, expect, it } from 'vitest';
import { mockRewards } from '@data/mockRewards';
import {
  buildRecommendationProfile,
  mapOffersToRecommendationOffers,
} from './recommendationAdapters';
import { generateRecommendedFeed } from './recommendationEngine';
import {
  clearRewardInteractions,
  getRewardInteractionProfile,
  trackRewardInteraction,
} from './rewardInteractions';

const mappedOffers = mapOffersToRecommendationOffers(mockRewards);

const personaScenarios = [
  {
    name: 'travel-first persona',
    user: {
      id: 'persona-travel',
      activeVehicle: { type: 'Private Car' },
      completionRates: { code: 0.9, deeplink: 0.35 },
    },
    score: { current: 292, band: 'Exemplary', recentTrend: 'Up' },
    interactionProfile: null,
    expectedCategories: ['travel'],
  },
  {
    name: 'food-first persona',
    user: {
      id: 'persona-food',
      activeVehicle: { type: 'Two Wheeler' },
      completionRates: { code: 0.85, deeplink: 0.55 },
    },
    score: { current: 255, band: 'Average', recentTrend: 'Down' },
    interactionProfile: {
      categoryAffinity: { food: 0.18, grocery: 0.14 },
      completionRatesByType: { code: 0.85 },
    },
    expectedCategories: ['food', 'grocery'],
  },
  {
    name: 'electronics-first persona',
    user: {
      id: 'persona-electronics',
      activeVehicle: { type: 'Private Car' },
      completionRates: { code: 0.45, deeplink: 0.95 },
    },
    score: { current: 280, band: 'Responsible', recentTrend: 'Stable' },
    interactionProfile: {
      categoryAffinity: { electronics: 0.28 },
      completionRatesByType: { deeplink: 0.95 },
    },
    expectedCategories: ['electronics', 'fashion', 'gifting'],
  },
];

describe('recommendation personalization', () => {
  it('returns different top offers for different personas', () => {
    const topOfferIds = personaScenarios.map(({ user, score, interactionProfile }) => {
      const feed = generateRecommendedFeed(
        mappedOffers,
        buildRecommendationProfile(user, score, interactionProfile),
        5
      );

      expect(feed[0]).toBeDefined();
      return feed[0].id;
    });

    expect(new Set(topOfferIds).size).toBeGreaterThan(1);
  });

  it('updates the ranked feed after stored reward interactions', async () => {
    const user = {
      id: 'sqlite-persona',
      activeRegistrationNumber: 'TN09GH1122',
    };
    const score = { current: 286, band: 'Exemplary', recentTrend: 'Up' };
    const electronicsOffer = mockRewards.find((reward) => reward.id === 'reward-012');

    expect(electronicsOffer).toBeTruthy();

    await clearRewardInteractions(user);

    const baselineFeed = generateRecommendedFeed(
      mappedOffers,
      buildRecommendationProfile(user, score),
      20
    );
    const baselineElectronics = baselineFeed.find((reward) => reward.id === electronicsOffer.id);

    await trackRewardInteraction(user, electronicsOffer, 'click');
    await trackRewardInteraction(user, electronicsOffer, 'redeem');

    const interactionProfile = await getRewardInteractionProfile(user);
    const updatedFeed = generateRecommendedFeed(
      mappedOffers,
      buildRecommendationProfile(user, score, interactionProfile),
      20
    );
    const updatedElectronics = updatedFeed.find((reward) => reward.id === electronicsOffer.id);

    expect(updatedFeed[0]).toBeDefined();
    expect(updatedElectronics?.score).toBeGreaterThan(baselineElectronics?.score ?? 0);
    expect(
      updatedFeed.findIndex((reward) => reward.id === electronicsOffer.id)
    ).toBeLessThanOrEqual(baselineFeed.findIndex((reward) => reward.id === electronicsOffer.id));
  });
});
