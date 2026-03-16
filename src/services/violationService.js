import api from './api';
import { mockViolations } from '@data/mockViolations';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const violationService = {
  getViolations: async (page = 1, limit = 10) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const startIdx = (page - 1) * limit;
          const endIdx = startIdx + limit;
          resolve({
            violations: mockViolations.slice(startIdx, endIdx),
            total: mockViolations.length,
            page,
            limit,
            hasMore: endIdx < mockViolations.length,
          });
        }, 700);
      });
    }

    return api.get(`/violations?page=${page}&limit=${limit}`);
  },

  getViolation: async (id) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const violation = mockViolations.find((v) => v.id === id);
          resolve(violation || {});
        }, 400);
      });
    }

    return api.get(`/violations/${id}`);
  },

  disputeViolation: async (violationId, reason) => {
    if (!USE_MOCK) {
      return api.post(`/violations/${violationId}/dispute`, { reason });
    }
  },

  payViolation: async (violationId, paymentMethod) => {
    if (!USE_MOCK) {
      return api.post(`/violations/${violationId}/pay`, { paymentMethod });
    }
  },
};
