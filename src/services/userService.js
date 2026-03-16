import api from './api';
import { mockUser } from '@data/mockUser';
import { isMockDataEnabled } from '@utils/env';

const USE_MOCK = isMockDataEnabled();

export const userService = {
  getMe: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockUser), 300);
      });
    }

    return api.get('/user/me');
  },

  updateMe: async (data) => {
    if (USE_MOCK) {
      return { ...mockUser, ...data };
    }

    return api.put('/user/me', data);
  },

  addVehicle: async (registrationNumber, type) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ...mockUser,
            vehicles: [
              {
                ...mockUser.vehicles[0],
                id: `vehicle-${Date.now()}`,
                registrationNumber,
                type,
                lastSynced: new Date().toISOString(),
              },
            ],
          });
        }, 600);
      });
    }

    return api.post('/vehicles', {
      registrationNumber,
      type,
    });
  },
};
