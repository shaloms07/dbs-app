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
      { registrationNumber: 'MH31AB1234', localRewardId: 'reward-021' }, // Nagpur
      { registrationNumber: 'MH12AB5555', localRewardId: 'reward-025' }, // Mumbai
      { registrationNumber: 'RJ14KL7788', localRewardId: 'reward-022' }, // Pune
      { registrationNumber: 'TN22JK9999', localRewardId: 'reward-037' }, // Chennai
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

  it('supports multiple vehicles on the same mobile number', () => {
    const mumbaiUser = getMockUser('MH12AB5555');
    const nagpurUser = getMockUser('MH31AB1234');
    const chennaiUser = getMockUser('TN09GH1122');

    expect(mumbaiUser.vehicles.map((vehicle) => vehicle.registrationNumber)).toEqual(
      expect.arrayContaining(['MH12AB5555', 'MH34CD6666'])
    );
    expect(mumbaiUser.vehicles).toHaveLength(2);

    expect(nagpurUser.vehicles.map((vehicle) => vehicle.registrationNumber)).toEqual(
      expect.arrayContaining(['MH31AB1234', 'MH12SC7788', 'MH34UV4444'])
    );
    expect(nagpurUser.vehicles).toHaveLength(3);

    expect(chennaiUser.vehicles.map((vehicle) => vehicle.registrationNumber)).toEqual(
      expect.arrayContaining(['TN09GH1122', 'TN22JK9999'])
    );
    expect(chennaiUser.vehicles).toHaveLength(2);
  });
});
