export const mockScore = {
  current: 742,
  max: 900,
  band: 'Good',
  percentile: 72,
  lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  target: 800,
  history: [
    { month: 'Oct 25', score: 810 },
    { month: 'Nov 25', score: 785 },
    { month: 'Dec 25', score: 760 },
    { month: 'Jan 26', score: 742 },
    { month: 'Feb 26', score: 742 },
    { month: 'Mar 26', score: 742 },
  ],
  stats: {
    cleanDays: 47,
    violationsThisYear: 3,
    streak: {
      currentDays: 47,
      bestDays: 96,
    },
  },
  nextMilestone: {
    daysUntilExpiry: 39,
    scoreGainOnExpiry: 22,
    violationType: 'Seatbelt Violation',
    pointsNeeded: 58,
  },
  simulator: {
    projections: [
      { scenario: 'No new violations for 30 days', daysFromNow: 30, scoreGain: 18 },
      { scenario: 'No new violations for 60 days', daysFromNow: 60, scoreGain: 34 },
      { scenario: 'No new violations for 90 days', daysFromNow: 90, scoreGain: 58 },
    ],
  },
};
