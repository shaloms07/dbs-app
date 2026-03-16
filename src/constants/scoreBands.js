// Score constants
export const SCORE_MAX = 900;
export const SCORE_MIN = 0;

// Score bands with colors
export const SCORE_BANDS = [
  {
    min: 0,
    max: 300,
    label: 'Poor',
    color: '#ef4444',
    tailwind: 'text-score-poor',
    bgTailwind: 'bg-red-50',
  },
  {
    min: 301,
    max: 450,
    label: 'Below Average',
    color: '#f97316',
    tailwind: 'text-score-below',
    bgTailwind: 'bg-orange-50',
  },
  {
    min: 451,
    max: 600,
    label: 'Average',
    color: '#eab308',
    tailwind: 'text-score-average',
    bgTailwind: 'bg-yellow-50',
  },
  {
    min: 601,
    max: 750,
    label: 'Good',
    color: '#3b82f6',
    tailwind: 'text-score-good',
    bgTailwind: 'bg-blue-50',
  },
  {
    min: 751,
    max: 900,
    label: 'Excellent',
    color: '#10b981',
    tailwind: 'text-score-excellent',
    bgTailwind: 'bg-green-50',
  },
];

// Get band for a score
export function getBand(score) {
  const band = SCORE_BANDS.find((b) => score >= b.min && score <= b.max);
  return band || SCORE_BANDS[0]; // Default to Poor if not found
}

// Convert score to angle (0-180 degrees for semicircle)
export function scoreToAngle(score) {
  const percentage = (score / SCORE_MAX) * 100;
  return (percentage / 100) * 180;
}

// Convert score to SVG stroke-dashoffset for gauge animation
// Arc length = 371 for the gauge path
export function scoreToStrokeDashOffset(score) {
  const percentage = (score / SCORE_MAX) * 100;
  const offset = 371 - (percentage / 100) * 371;
  return offset;
}
