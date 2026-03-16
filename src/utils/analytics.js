export function track(eventName, properties = {}) {
  const analyticsEnabled = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

  if (!analyticsEnabled) {
    console.log(`[Analytics Disabled] Event: ${eventName}`, properties);
    return;
  }

  // In production, send to analytics service (e.g., Google Analytics, Mixpanel)
  console.log(`[Analytics] Event: ${eventName}`, properties);

  // Placeholder for actual analytics implementation
  // gtag('event', eventName, properties);
}

// Common event helpers
export const analyticsEvents = {
  // Auth events
  loginOtpSent: (mobile) => track('login_otp_sent', { mobile }),
  loginSuccess: () => track('login_success'),
  loginFailed: (reason) => track('login_failed', { reason }),
  logout: () => track('logout'),

  // Score events
  scoreViewed: (score, band, percentile) => track('score_viewed', { score, band, percentile }),
  scoreBreakdownViewed: () => track('score_breakdown_viewed'),

  // Navigation events
  tabSwitched: (tab) => track('tab_switched', { tab }),
  screenViewed: (screen) => track('screen_viewed', { screen }),

  // Rewards events
  rewardsViewed: () => track('rewards_viewed'),
  rewardRedeemed: (rewardId, rewardName) => track('reward_redeemed', { rewardId, rewardName }),
  rewardUnlocked: (rewardId, band) => track('reward_unlocked', { rewardId, band }),

  // Insurance events
  insuranceViewed: () => track('insurance_viewed'),
  insuranceQuoteRequested: (insurer) => track('insurance_quote_requested', { insurer }),

  // Error events
  apiError: (endpoint, status, message) => track('api_error', { endpoint, status, message }),
  errorBoundaryTriggered: (error) => track('error_boundary_triggered', { error: error.message }),
};
