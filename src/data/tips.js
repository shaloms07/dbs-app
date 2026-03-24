export const TIPS = [
  {
    id: 'tip-001',
    icon: '🚦',
    title: 'Respect traffic signals',
    description:
      'Stopping at signals consistently prevents high-impact deductions and keeps your record clean.',
    category: 'signal',
    audience: ['all'],
  },
  {
    id: 'tip-002',
    icon: '🪖',
    title: 'Wear your helmet every ride',
    description:
      'Helmet violations hit your score and your safety at the same time. Make it automatic.',
    category: 'helmet',
    audience: ['two-wheeler'],
  },
  {
    id: 'tip-003',
    icon: '📵',
    title: 'Keep your phone away while driving',
    description:
      'Phone usage is easy to avoid and often leads to avoidable challans. Use navigation audio instead.',
    category: 'phone',
    audience: ['all'],
  },
  {
    id: 'tip-004',
    icon: '⚡',
    title: 'Stay within speed limits',
    description:
      'Speeding violations usually carry heavier penalties. Build in a buffer and leave earlier.',
    category: 'speed',
    audience: ['all'],
  },
  {
    id: 'tip-005',
    icon: '🔒',
    title: 'Buckle up before moving',
    description: 'Seatbelts are one of the simplest ways to avoid repeat low-value deductions.',
    category: 'seatbelt',
    audience: ['four-wheeler'],
  },
  {
    id: 'tip-006',
    icon: '🛣',
    title: 'Practice lane discipline',
    description:
      'Predictable lane behavior reduces risky maneuvers and keeps your driving pattern steady.',
    category: 'other',
    audience: ['all'],
  },
];

export function getTipsForVehicle(vehicleType = '') {
  const vehicleFamily = /two/i.test(vehicleType) ? 'two-wheeler' : 'four-wheeler';

  return TIPS.filter((tip) => tip.audience.includes('all') || tip.audience.includes(vehicleFamily));
}
