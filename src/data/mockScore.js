export const mockScore = {
  current: 247,
  legacyScore: 742,
  max: 300,
  band: 'Good',
  percentile: 72,
  lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  target: 270,
  history: [
    { month: 'Oct 25', score: 268 },
    { month: 'Nov 25', score: 261 },
    { month: 'Dec 25', score: 253 },
    { month: 'Jan 26', score: 247 },
    { month: 'Feb 26', score: 245 },
    { month: 'Mar 26', score: 247 },
  ],
  stats: {
    cleanDays: 47,
    violationsLast12Months: 3,
    streak: {
      currentDays: 47,
      bestDays: 96,
    },
  },
  nextMilestone: {
    daysUntilExpiry: 39,
    scoreGainOnExpiry: 8,
    violationType: 'Seatbelt Violation',
    pointsNeeded: 23,
  },
  simulator: {
    projections: [
      { scenario: 'No new challans for 30 days', daysFromNow: 30, scoreGain: 7 },
      { scenario: 'No new challans for 60 days', daysFromNow: 60, scoreGain: 14 },
      { scenario: 'No new challans for 90 days', daysFromNow: 90, scoreGain: 23 },
    ],
  },
};
