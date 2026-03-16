import api from './api';
import { mockInsurance } from '@data/mockInsurance';
import { isMockDataEnabled } from '@utils/env';

const USE_MOCK = isMockDataEnabled();

export const insuranceService = {
  getInsurance: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockInsurance);
        }, 700);
      });
    }

    return api.get('/insurance/current');
  },

  getInsurers: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            insurers: mockInsurance.insurers,
            updated: new Date().toISOString(),
          });
        }, 600);
      });
    }

    return api.get('/insurance/insurers');
  },

  getQuote: async (insurer_id) => {
    if (!USE_MOCK) {
      return api.get(`/insurance/quote/${insurer_id}`);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const insurer = mockInsurance.insurers.find((i) => i.id === insurer_id);
        resolve({
          insurer_id,
          premium: insurer?.premiumForCurrentDBS || 2450,
          discount: insurer?.discountPercent || 5,
        });
      }, 500);
    });
  },

  requestQuote: async (insurer_id) => {
    if (!USE_MOCK) {
      return api.post('/insurance/request-quote', { insurer_id });
    }
  },

  getRenewalHistory: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            history: mockInsurance.renewalHistory,
          });
        }, 400);
      });
    }

    return api.get('/insurance/renewal-history');
  },
};
