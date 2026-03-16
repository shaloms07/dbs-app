import api from './api';
import { mockUser } from '@data/mockUser';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

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
