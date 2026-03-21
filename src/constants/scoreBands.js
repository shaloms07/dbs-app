export const SCORE_MAX = 300;
export const SCORE_MIN = 0;

export const SCORE_BANDS = [
  {
    min: 285,
    max: 300,
    label: 'Exemplary',
    color: '#1f8f80',
    tailwind: 'text-emerald-700',
    bgTailwind: 'bg-emerald-50',
  },
  {
    min: 270,
    max: 284,
    label: 'Responsible',
    color: '#2f9b84',
    tailwind: 'text-emerald-600',
    bgTailwind: 'bg-emerald-50',
  },
  {
    min: 240,
    max: 269,
    label: 'Average',
    color: '#5b8f72',
    tailwind: 'text-teal-700',
    bgTailwind: 'bg-teal-50',
  },
  {
    min: 210,
    max: 239,
    label: 'Marginal',
    color: '#c59a4b',
    tailwind: 'text-amber-700',
    bgTailwind: 'bg-amber-50',
  },
  {
    min: 180,
    max: 209,
    label: 'At Risk',
    color: '#d98b39',
    tailwind: 'text-orange-600',
    bgTailwind: 'bg-orange-50',
  },
  {
    min: 150,
    max: 179,
    label: 'High Risk',
    color: '#e07038',
    tailwind: 'text-orange-700',
    bgTailwind: 'bg-orange-50',
  },
  {
    min: 120,
    max: 149,
    label: 'Serious Risk',
    color: '#d95d39',
    tailwind: 'text-orange-700',
    bgTailwind: 'bg-orange-50',
  },
  {
    min: 90,
    max: 119,
    label: 'Chronic Violator',
    color: '#e98647',
    tailwind: 'text-orange-500',
    bgTailwind: 'bg-orange-50',
  },
  {
    min: 60,
    max: 89,
    label: 'Habitual Offender',
    color: '#d95d39',
    tailwind: 'text-rose-700',
    bgTailwind: 'bg-rose-50',
  },
  {
    min: 0,
    max: 59,
    label: 'Extreme Risk',
    color: '#b42318',
    tailwind: 'text-red-700',
    bgTailwind: 'bg-red-50',
  },
];

export function getBand(score) {
  const clamped = Math.max(SCORE_MIN, Math.min(score, SCORE_MAX));
  return SCORE_BANDS.find((band) => clamped >= band.min && clamped <= band.max) ?? SCORE_BANDS[0];
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
