export const SCORE_MAX = 900;
export const SCORE_MIN = 0;

export const SCORE_BANDS = [
  {
    min: 0,
    max: 299,
    label: 'Poor',
    color: '#ef4444',
    tailwind: 'text-red-500',
    bgTailwind: 'bg-red-50',
  },
  {
    min: 300,
    max: 499,
    label: 'Below Average',
    color: '#f97316',
    tailwind: 'text-orange-500',
    bgTailwind: 'bg-orange-50',
  },
  {
    min: 500,
    max: 649,
    label: 'Average',
    color: '#eab308',
    tailwind: 'text-amber-500',
    bgTailwind: 'bg-amber-50',
  },
  {
    min: 650,
    max: 799,
    label: 'Good',
    color: '#3b82f6',
    tailwind: 'text-blue-500',
    bgTailwind: 'bg-blue-50',
  },
  {
    min: 800,
    max: 900,
    label: 'Excellent',
    color: '#10b981',
    tailwind: 'text-green-600',
    bgTailwind: 'bg-green-50',
  },
];

export function getBand(score) {
  return SCORE_BANDS.find((band) => score >= band.min && score <= band.max) ?? SCORE_BANDS[0];
}

export function scoreToAngle(score) {
  const clamped = Math.max(SCORE_MIN, Math.min(score, SCORE_MAX));
  return -90 + (clamped / SCORE_MAX) * 180;
}

export function scoreToStrokeDashOffset(score) {
  const arcLength = 371;
  const clamped = Math.max(SCORE_MIN, Math.min(score, SCORE_MAX));
  return arcLength - (clamped / SCORE_MAX) * arcLength;
}
