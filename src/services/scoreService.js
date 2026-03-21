import api from './api';
import { getMockScore } from '@data/mockDbsData';
import { isMockDataEnabled } from '@utils/env';

const USE_MOCK = isMockDataEnabled();

export const scoreService = {
  getScore: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(getMockScore());
        }, 800);
      });
    }

    return api.get('/score/current');
  },

  getHistory: async (months = 12) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        const mockScore = getMockScore();

        setTimeout(() => {
          resolve({
            history: mockScore.history,
            period: `Last ${months} months`,
          });
        }, 600);
      });
    }

    return api.get(`/score/history?months=${months}`);
  },

  getSimulator: async (scenarioType = 'no_violations') => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        const mockScore = getMockScore();

        setTimeout(() => {
          resolve({
            currentScore: mockScore.current,
            simulatedScore: Math.min(mockScore.current + 23, mockScore.max),
            improvement: 23,
            scenario: scenarioType,
            daysRequired: 90,
          });
        }, 500);
      });
    }

    return api.post('/score/simulate', { scenarioType });
  },

  refreshScore: async () => {
    if (!USE_MOCK) {
      return api.post('/score/refresh');
    }
  },
};
