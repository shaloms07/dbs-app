export const mockScore = {
  current: 742,
  band: 'Good',
  percentile: 28,
  lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  history: [
    { month: 'Aug 25', score: 680 },
    { month: 'Sep 25', score: 695 },
    { month: 'Oct 25', score: 715 },
    { month: 'Nov 25', score: 728 },
    { month: 'Dec 25', score: 738 },
    { month: 'Jan 26', score: 742 },
  ],
  stats: {
    cleanDays: 47,
    violationsThisYear: 3,
  },
  nextMilestone: {
    band: 'Excellent',
    pointsNeeded: 160,
  },
};
