export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',

  // API errors
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized. Please log in again.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  SERVER_ERROR: 'Something went wrong on the server. Please try again later.',
  BAD_REQUEST: 'Invalid request. Please check your input.',
  CONFLICT: 'This resource already exists.',
  RATE_LIMITED: 'Too many requests. Please wait a moment and try again.',

  // Auth errors
  INVALID_OTP: 'Invalid OTP. Please enter the correct code.',
  OTP_EXPIRED: 'OTP has expired. Please request a new one.',
  INVALID_MOBILE: 'Please enter a valid 10-digit mobile number.',
  MOBILE_NOT_FOUND: 'Mobile number not registered.',

  // Validation errors
  INVALID_VEHICLE_NUMBER: 'Please enter a valid vehicle registration number.',
  INVALID_EMAIL: 'Please enter a valid email address.',

  // Generic error
  DEFAULT_ERROR: 'Something went wrong. Please try again.',
};

// Get error message from API error status code
export function getErrorMessage(error) {
  // Network error
  if (!error.response) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  const status = error.response.status;
  const data = error.response.data;

  // Check for custom error message from API
  if (data && data.message) {
    return data.message;
  }

  // Map status codes to error messages
  switch (status) {
    case 400:
      return ERROR_MESSAGES.BAD_REQUEST;
    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 403:
      return ERROR_MESSAGES.FORBIDDEN;
    case 404:
      return ERROR_MESSAGES.NOT_FOUND;
    case 409:
      return ERROR_MESSAGES.CONFLICT;
    case 429:
      return ERROR_MESSAGES.RATE_LIMITED;
    case 500:
    case 502:
    case 503:
    case 504:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return ERROR_MESSAGES.DEFAULT_ERROR;
  }
}
