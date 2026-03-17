import api from './api';
import { mockViolations } from '@data/mockViolations';
import { isMockDataEnabled } from '@utils/env';

const USE_MOCK = isMockDataEnabled();
const TWELVE_MONTHS_IN_MS = 365 * 24 * 60 * 60 * 1000;

function withAging(violation) {
  const violationDate = new Date(violation.date).getTime();
  const isAgedOut = Date.now() - violationDate > TWELVE_MONTHS_IN_MS;

  return {
    ...violation,
    isAgedOut,
    status: isAgedOut && violation.status === 'active' ? 'expired' : violation.status,
  };
}

export const violationService = {
  getViolations: async (page = 1, limit = 10) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const hydrated = mockViolations.map(withAging);
          const startIdx = (page - 1) * limit;
          const endIdx = startIdx + limit;

          resolve({
            violations: hydrated.slice(startIdx, endIdx),
            total: hydrated.length,
            page,
            limit,
            hasMore: endIdx < hydrated.length,
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
          resolve(violation ? withAging(violation) : {});
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
