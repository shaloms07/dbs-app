import api from './api';
import { clearAllCache } from '@utils/cache';
import { getMockUser, setActiveRegistration } from '@data/mockDbsData';
import { isMockDataEnabled } from '@utils/env';

const USE_MOCK = isMockDataEnabled();

export const userService = {
  getMe: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(getMockUser()), 300);
      });
    }

    return api.get('/user/me');
  },

  updateMe: async (data) => {
    if (USE_MOCK) {
      return { ...getMockUser(), ...data };
    }

    return api.put('/user/me', data);
  },

  addVehicle: async (registrationNumber, type) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const activeRegistration = setActiveRegistration(registrationNumber);
          const mockUser = getMockUser(activeRegistration);

          clearAllCache();

          resolve(mockUser);
        }, 600);
      });
    }

    return api.post('/vehicles', {
      registrationNumber,
      type,
    });
  },
};
