import { describe, expect, it } from 'vitest';
import { mockRewards } from '@data/mockRewards';
import {
  enrichRewardCatalog,
  getRewardCouponValue,
  getRewardFulfillmentSummary,
} from './rewardFulfillment';

describe('rewardFulfillment', () => {
  it('adds fulfillment metadata to the reward catalog', () => {
    const [reward] = enrichRewardCatalog(mockRewards.filter((item) => item.id === 'reward-007'));

    expect(reward.fulfillmentType).toBe('coupon-pin');
    expect(reward.couponMode).toBe('static');
    expect(reward.confirmationPinRequired).toBe(true);
    expect(reward.maxUseLimit).toBeGreaterThan(0);
  });

  it('generates a stable dynamic coupon code per user', () => {
    const dynamicReward = mockRewards.find((item) => item.id === 'reward-011');
    const user = { id: 'user-1', mobile: '9999999999' };

    expect(getRewardCouponValue(dynamicReward, user)).toBe(
      getRewardCouponValue(dynamicReward, user)
    );
  });

  it('summarises offline and online rewards correctly', () => {
    const offlineReward = mockRewards.find((item) => item.id === 'reward-005');
    const onlineReward = mockRewards.find((item) => item.id === 'reward-024');

    expect(getRewardFulfillmentSummary(offlineReward).fulfillmentLabel).toBe('Offline');
    expect(getRewardFulfillmentSummary(onlineReward).fulfillmentLabel).toBe('Online');
  });
});
