import { describe, expect, it } from 'vitest';
import {
  buildRecommendationProfile,
  mapOffersToRecommendationOffers,
} from './recommendationAdapters';
import { generateRecommendedFeed } from './recommendationEngine';

const offers = [
  {
    id: 'travel-high',
    brand: 'TripOne',
    offerTitle: 'Travel voucher worth Rs 1200',
    offerCondition: 'Use on select bookings',
    category: 'travel',
    minimumScore: 220,
    isUnlocked: true,
    pointsNeeded: 0,
    cardImageUrl: '',
    redemptionType: 'code',
    redemptionValue: 'TRIP1200',
    expiresAt: '2026-06-30',
  },
  {
    id: 'food-high',
    brand: 'SnackHub',
    offerTitle: 'Food cashback worth Rs 500',
    offerCondition: 'Valid on app orders',
    category: 'food',
    minimumScore: 200,
    isUnlocked: true,
    pointsNeeded: 0,
    cardImageUrl: '',
    redemptionType: 'deeplink',
    redemptionValue: 'FOOD500',
    expiresAt: '2026-04-01',
  },
];

describe('recommendation flow', () => {
  it('changes ranking when the user profile changes', () => {
    const carUser = {
      id: 'car-user',
      activeVehicle: { type: 'Private Car' },
      completionRates: { code: 0.95, deeplink: 0.2 },
    };
    const bikeUser = {
      id: 'bike-user',
      activeVehicle: { type: 'Two Wheeler' },
      completionRates: { code: 0.2, deeplink: 0.95 },
    };
    const score = {
      current: 240,
      band: 'Responsible',
      recentTrend: 'Up',
    };

    const carFeed = generateRecommendedFeed(
      mapOffersToRecommendationOffers(offers),
      buildRecommendationProfile(carUser, score),
      2
    );
    const bikeFeed = generateRecommendedFeed(
      mapOffersToRecommendationOffers(offers),
      buildRecommendationProfile(bikeUser, score),
      2
    );

    expect(carFeed).toHaveLength(2);
    expect(bikeFeed).toHaveLength(2);
    expect(carFeed[0].id).not.toBe(bikeFeed[0].id);
  });
});
