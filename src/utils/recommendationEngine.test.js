import { describe, expect, it, vi } from 'vitest';
import {
  affordabilityScore,
  calculateOfferScore,
  generateRecommendedFeed,
  likelihoodScore,
  relevanceScore,
  urgencyScore,
  valueRatioScore,
} from './recommendationEngine';

describe('recommendationEngine', () => {
  it('calculates cosine relevance', () => {
    expect(
      relevanceScore({ travel: 1, food: 0.2 }, { travel: 0.8, electronics: 0.2 })
    ).toBeGreaterThan(0);
    expect(relevanceScore({ travel: 1 }, { grocery: 1 })).toBe(0);
  });

  it('scores urgency from hours remaining and timestamps', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-16T00:00:00Z'));

    expect(urgencyScore(4)).toBe(1);
    expect(urgencyScore(12)).toBe(0.7);
    expect(urgencyScore(48)).toBe(0.4);
    expect(urgencyScore(120)).toBe(0.1);
    expect(urgencyScore('2026-03-16T04:00:00Z')).toBe(1);

    vi.useRealTimers();
  });

  it('scores value ratio and affordability', () => {
    expect(valueRatioScore(100, 10)).toBe(1);
    expect(valueRatioScore(20, 10)).toBe(0.2);
    expect(valueRatioScore(-50, 10)).toBe(0.2);
    expect(affordabilityScore(50, 20)).toBe(1);
    expect(affordabilityScore(10, 20)).toBe(0);
    expect(affordabilityScore(10, 0)).toBe(1);
  });

  it('uses historical likelihood with a sensible default', () => {
    expect(likelihoodScore({ code: 0.8 }, 'code')).toBe(0.8);
    expect(likelihoodScore({}, 'code')).toBe(0.5);
  });

  it('combines scores into a ranked feed', () => {
    const userProfile = {
      pointBalance: 200,
      interests: { travel: 1, food: 0.2 },
      completionRates: { code: 0.8 },
    };

    const offers = [
      {
        id: 'a',
        categories: { travel: 1 },
        points: 100,
        effort: 5,
        expiresAt: 4,
        type: 'code',
        cost: 20,
      },
      {
        id: 'b',
        categories: { grocery: 1 },
        points: 30,
        effort: 5,
        expiresAt: 120,
        type: 'code',
        cost: 20,
      },
    ];

    expect(calculateOfferScore(offers[0], userProfile)).toBeGreaterThan(
      calculateOfferScore(offers[1], userProfile)
    );
    expect(generateRecommendedFeed(offers, userProfile, 1)).toHaveLength(1);
    expect(generateRecommendedFeed(offers, userProfile, 1)[0].id).toBe('a');
    expect(generateRecommendedFeed(offers, userProfile, 1)[0]).toHaveProperty('score');
  });
});
