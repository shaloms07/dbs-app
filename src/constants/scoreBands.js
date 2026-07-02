export const SCORE_MAX = 300;
export const SCORE_MIN = 0;

export const SCORE_BANDS = [
  {
    min: 285,
    max: 300,
    label: 'Exemplary',
    color: '#15803D',
    tailwind: 'text-green-700',
    bgTailwind: 'bg-green-50',
  },
  {
    min: 270,
    max: 284,
    label: 'Responsible',
    color: '#16A34A',
    tailwind: 'text-green-600',
    bgTailwind: 'bg-green-50',
  },
  {
    min: 240,
    max: 269,
    label: 'Average',
    color: '#65A30D',
    tailwind: 'text-lime-600',
    bgTailwind: 'bg-lime-50',
  },
  {
    min: 210,
    max: 239,
    label: 'Marginal',
    color: '#CA8A04',
    tailwind: 'text-yellow-700',
    bgTailwind: 'bg-yellow-50',
  },
  {
    min: 180,
    max: 209,
    label: 'At Risk',
    color: '#EAB308',
    tailwind: 'text-yellow-600',
    bgTailwind: 'bg-yellow-50',
  },
  {
    min: 150,
    max: 179,
    label: 'High Risk',
    color: '#F59E0B',
    tailwind: 'text-amber-600',
    bgTailwind: 'bg-amber-50',
  },
  {
    min: 120,
    max: 149,
    label: 'Serious Risk',
    color: '#EA580C',
    tailwind: 'text-orange-600',
    bgTailwind: 'bg-orange-50',
  },
  {
    min: 90,
    max: 119,
    label: 'Chronic Violator',
    color: '#E04C2E',
    tailwind: 'text-orange-700',
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
