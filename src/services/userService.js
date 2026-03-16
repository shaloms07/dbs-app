import api from './api';
import { mockUser } from '@data/mockUser';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const userService = {
  getMe: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockUser);
        }, 500);
      });
    }

    return api.get('/user/me');
  },

  updateMe: async (data) => {
    if (!USE_MOCK) {
      return api.put('/user/me', data);
    }
  },

  addVehicle: async (registrationNumber, type) => {
    if (!USE_MOCK) {
      return api.post('/user/vehicles', {
        registrationNumber,
        type,
      });
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'vehicle-new-' + Date.now(),
          registrationNumber,
          type,
          lastSynced: new Date().toISOString(),
        });
      }, 800);
    });
  },

  updateVehicle: async (vehicleId, data) => {
    if (!USE_MOCK) {
      return api.put(`/user/vehicles/${vehicleId}`, data);
    }
  },

  deleteVehicle: async (vehicleId) => {
    if (!USE_MOCK) {
      return api.delete(`/user/vehicles/${vehicleId}`);
    }
  },

  getProfile: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const { ...profile } = mockUser;
          resolve(profile);
        }, 400);
      });
    }

    return api.get('/user/profile');
  },

  changePassword: async (currentPassword, newPassword) => {
    if (!USE_MOCK) {
      return api.post('/user/change-password', {
        currentPassword,
        newPassword,
      });
    }
  },
};
