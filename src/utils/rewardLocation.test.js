import { describe, expect, it } from 'vitest';
import { mockRewards } from '@data/mockRewards';
import { filterRewardsByLocation, isRewardVisibleToUser } from './rewardLocation';

describe('rewardLocation', () => {
  it('shows local, state, national, and online offers for the matching city', () => {
    const nagpurUser = {
      residenceCity: 'Nagpur',
      residenceState: 'Maharashtra',
    };

    const nagpurRewards = filterRewardsByLocation(mockRewards, nagpurUser);

    expect(nagpurRewards.some((reward) => reward.id === 'reward-021')).toBe(true);
    expect(nagpurRewards.some((reward) => reward.id === 'reward-023')).toBe(true);
    expect(nagpurRewards.some((reward) => reward.id === 'reward-029')).toBe(true);
    expect(nagpurRewards.some((reward) => reward.id === 'reward-022')).toBe(false);
    expect(nagpurRewards.some((reward) => reward.id === 'reward-028')).toBe(false);
    expect(nagpurRewards.some((reward) => reward.id === 'reward-024')).toBe(true);
    expect(nagpurRewards.some((reward) => reward.id === 'reward-032')).toBe(true);
  });

  it('keeps Pune users away from Nagpur-only local rewards', () => {
    const puneUser = {
      residenceCity: 'Pune',
      residenceState: 'Maharashtra',
    };

    expect(
      isRewardVisibleToUser(
        mockRewards.find((reward) => reward.id === 'reward-021'),
        puneUser
      )
    ).toBe(false);
    expect(
      isRewardVisibleToUser(
        mockRewards.find((reward) => reward.id === 'reward-022'),
        puneUser
      )
    ).toBe(true);
    expect(
      isRewardVisibleToUser(
        mockRewards.find((reward) => reward.id === 'reward-023'),
        puneUser
      )
    ).toBe(true);
    expect(
      isRewardVisibleToUser(
        mockRewards.find((reward) => reward.id === 'reward-025'),
        puneUser
      )
    ).toBe(false);
    expect(
      isRewardVisibleToUser(
        mockRewards.find((reward) => reward.id === 'reward-032'),
        puneUser
      )
    ).toBe(true);
  });
});
