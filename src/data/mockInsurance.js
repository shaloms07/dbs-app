export const mockInsurance = {
  currentPolicy: {
    provider: 'ICICI Insurance',
    policyNumber: 'POL123456789',
    type: 'Third Party',
    vehicleReg: 'UP32AB1234',
    premium: 2450,
    renewalDueDate: '2026-03-31',
    daysUntilRenewal: 45,
  },
  dbsImpact: {
    currentScore: 742,
    band: 'Good',
    currentLoading: 0, // 0% loading for Good band
    discountInPercent: 5, // 5% discount for Good band
    discountInAmount: 122.5, // 5% of 2450
  },
  benchmarkPricing: {
    poorBand: 3675, // 50% loading
    belowAverage: 3234, // 32% loading
    average: 2695, // 10% loading
    good: 2450, // No loading (base price, or slight discount)
    excellent: 2084, // 15% discount
  },
  insurers: [
    {
      id: 'insurer-001',
      name: 'ICICI Insurance',
      logo: 'icici-logo.png',
      premiumForCurrentDBS: 2450,
      discountPercent: 5,
      coverageType: 'Third Party',
      features: ['NCB Benefit', 'Cashless Claim', 'Online Renewal'],
      rating: 4.5,
      reviews: 2840,
      nclbBenefit: true,
    },
    {
      id: 'insurer-002',
      name: 'Bajaj Allianz',
      logo: 'bajaj-logo.png',
      premiumForCurrentDBS: 2380,
      discountPercent: 7,
      coverageType: 'Third Party',
      features: ['Accidental Benefit', 'Roadside Assistance', 'Fast Claim Processing'],
      rating: 4.4,
      reviews: 3120,
      nclbBenefit: true,
    },
    {
      id: 'insurer-003',
      name: 'Bharti AXA Insurance',
      logo: 'bharti-axa-logo.png',
      premiumForCurrentDBS: 2520,
      discountPercent: 3,
      coverageType: 'Third Party',
      features: ['Hassle-Free Claim', 'Mobile App', 'Paperless Process'],
      rating: 4.3,
      reviews: 1950,
      nclbBenefit: false,
    },
  ],
  renewalHistory: [
    {
      year: 2024,
      provider: 'ICICI Insurance',
      premium: 2450,
      band: 'Good',
    },
    {
      year: 2023,
      provider: 'Bajaj Allianz',
      premium: 2680,
      band: 'Average',
    },
    {
      year: 2022,
      provider: 'ICICI Insurance',
      premium: 2900,
      band: 'Below Average',
    },
  ],
};
