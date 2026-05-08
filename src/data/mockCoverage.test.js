import { describe, expect, it } from 'vitest';
import { mockRewards } from '@data/mockRewards';
import { getMockUser, getSampleUsers } from './mockDbsData';
import { filterRewardsByLocation } from '@utils/rewardLocation';

describe('mock coverage', () => {
  it('keeps the active sample user pool at five profiles', () => {
    expect(getSampleUsers()).toHaveLength(5);
  });

  it('covers each active city with at least one local reward', () => {
    const scenarios = [
      { registrationNumber: 'MH31AB1234', localRewardId: 'reward-021' },
      { registrationNumber: 'MH12AB5555', localRewardId: 'reward-025' },
      { registrationNumber: 'MH34CD6666', localRewardId: 'reward-034' },
      { registrationNumber: 'KA02GH8888', localRewardId: 'reward-036' },
      { registrationNumber: 'TN22JK9999', localRewardId: 'reward-037' },
    ];

    for (const scenario of scenarios) {
      const user = getMockUser(scenario.registrationNumber);
      const visibleRewards = filterRewardsByLocation(mockRewards, user);

      expect(
        visibleRewards.some((reward) => reward.id === scenario.localRewardId),
        scenario.registrationNumber
      ).toBe(true);
      expect(
        visibleRewards.some((reward) =>
          ['reward-024', 'reward-032', 'reward-043'].includes(reward.id)
        ),
        scenario.registrationNumber
      ).toBe(true);
    }
  });
});
