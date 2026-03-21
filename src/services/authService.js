import api from './api';
import {
  MOCK_OTP,
  MOCK_PASSWORD,
  getMockUserByMobile,
  getRegistrationForMobile,
  setActiveRegistration,
} from '@data/mockDbsData';
import { isMockDataEnabled } from '@utils/env';

const USE_MOCK = isMockDataEnabled();

export const authService = {
  sendOtp: async (mobile, password) => {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const registrationNumber = getRegistrationForMobile(mobile);

          if (!registrationNumber) {
            reject(new Error('No sample user found for this mobile number'));
            return;
          }

          if (password !== MOCK_PASSWORD) {
            reject(new Error('Invalid password'));
            return;
          }

          resolve({
            success: true,
            message: 'OTP sent successfully',
            otpLength: 6,
          });
        }, 1000);
      });
    }

    return api.post('/auth/send-otp', { mobile, password });
  },

  verifyOtp: async (mobile, otp) => {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const registrationNumber = getRegistrationForMobile(mobile);

          if (!registrationNumber) {
            reject(new Error('No sample user found for this mobile number'));
            return;
          }

          if (otp !== MOCK_OTP) {
            reject(new Error('Invalid OTP'));
            return;
          }

          setActiveRegistration(registrationNumber);

          resolve({
            success: true,
            token: `mock_jwt_token_${registrationNumber}_${Date.now()}`,
            user: getMockUserByMobile(mobile),
            isNewUser: false,
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
