import api from './api';
import { mockUser } from '@data/mockUser';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const authService = {
  sendOtp: async (mobile) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'OTP sent successfully',
            otpLength: 6,
          });
        }, 1000);
      });
    }

    return api.post('/auth/send-otp', { mobile });
  },

  verifyOtp: async (mobile, otp) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            token: 'mock_jwt_token_' + Date.now(),
            user: mockUser,
            isNewUser: Math.random() > 0.7, // 30% new users
          });
        }, 1500);
      });
    }

    return api.post('/auth/verify-otp', { mobile, otp });
  },

  logout: async () => {
    if (!USE_MOCK) {
      return api.post('/auth/logout');
    }
  },
};
