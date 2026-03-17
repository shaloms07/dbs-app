export const SCORE_MAX = 300;
export const SCORE_MIN = 0;

export const SCORE_BANDS = [
  {
    min: 0,
    max: 99,
    label: 'Poor',
    color: '#d95d39',
    tailwind: 'text-orange-700',
    bgTailwind: 'bg-orange-50',
  },
  {
    min: 100,
    max: 159,
    label: 'Below Average',
    color: '#e98647',
    tailwind: 'text-orange-500',
    bgTailwind: 'bg-orange-50',
  },
  {
    min: 160,
    max: 219,
    label: 'Average',
    color: '#d9b75f',
    tailwind: 'text-amber-600',
    bgTailwind: 'bg-amber-50',
  },
  {
    min: 220,
    max: 259,
    label: 'Good',
    color: '#5b8f72',
    tailwind: 'text-emerald-700',
    bgTailwind: 'bg-emerald-50',
  },
  {
    min: 260,
    max: 300,
    label: 'Excellent',
    color: '#1f8f80',
    tailwind: 'text-emerald-600',
    bgTailwind: 'bg-emerald-50',
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
