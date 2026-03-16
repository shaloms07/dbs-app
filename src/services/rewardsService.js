import api from './api';
import { mockRewards } from '@data/mockRewards';
import { isMockDataEnabled } from '@utils/env';

const USE_MOCK = isMockDataEnabled();

export const rewardsService = {
  getRewards: async (category = null, page = 1, limit = 10) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let filtered = mockRewards;
          if (category) {
            filtered = mockRewards.filter((r) => r.category === category);
          }
          const startIdx = (page - 1) * limit;
          const endIdx = startIdx + limit;
          resolve({
            rewards: filtered.slice(startIdx, endIdx),
            total: filtered.length,
            page,
            limit,
            hasMore: endIdx < filtered.length,
          });
        }, 600);
      });
    }

    const params = new URLSearchParams();
    if (category) params.append('category', category);
    params.append('page', page);
    params.append('limit', limit);

    return api.get(`/rewards?${params.toString()}`);
  },

  getReward: async (id) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const reward = mockRewards.find((r) => r.id === id);
          resolve(reward || {});
        }, 400);
      });
    }

    return api.get(`/rewards/${id}`);
  },

  redeem: async (rewardId) => {
    if (!USE_MOCK) {
      return api.post(`/rewards/${rewardId}/redeem`);
    }
  },

  getRedemptionHistory: async (page = 1, limit = 10) => {
    if (!USE_MOCK) {
      return api.get(`/rewards/redemptions?page=${page}&limit=${limit}`);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          redemptions: [],
          total: 0,
          page,
          limit,
        });
      }, 400);
    });
  },
};
