const MOCK_REFERENCE_DATE = '2026-03-21T00:00:00+05:30';
const TWELVE_MONTHS_IN_DAYS = 365;
const ACTIVE_REGISTRATION_STORAGE_KEY = 'tr_mock_active_registration';
export const MOCK_PASSWORD = 'pass123';
export const MOCK_OTP = '123456';

export const DBS_SCORE_CONFIG = {
  min: 0,
  max: 300,
  startingScore: 300,
  windowMonths: 12,
  referenceDate: MOCK_REFERENCE_DATE,
};

export const DBS_REPEAT_MULTIPLIERS = {
  '1-2': 1,
  '3-4': 2,
  '5-6': 3,
  '7+': 3,
};

export const SAMPLE_REGISTRATIONS = [
  'MH31AB1234',
  'UP32CD5678',
  'DL8CAF9012',
  'KA01MN3456',
  'TN09GH1122',
  'RJ14KL7788',
  'GJ05QW3344',
  'AP39ZX5566',
  'WB20LM4433',
  'MP09RS7711',
];

const SAMPLE_USER_PROFILES = {
  MH31AB1234: {
    firstName: 'Aarav',
    lastName: 'Deshmukh',
    mobile: '9876543210',
    email: 'aarav.deshmukh@example.com',
    licenceNumber: 'MH1220150001234',
  },
  UP32CD5678: {
    firstName: 'Aarav',
    lastName: 'Deshmukh',
    mobile: '9876543210',
    email: 'aarav.deshmukh@example.com',
    licenceNumber: 'MH1220150001234',
  },
  DL8CAF9012: {
    firstName: 'Rohit',
    lastName: 'Kumar',
    mobile: '9876543212',
    email: 'rohit.kumar@example.com',
    licenceNumber: 'DL820130009012',
  },
  KA01MN3456: {
    firstName: 'Meera',
    lastName: 'Rao',
    mobile: '9876543213',
    email: 'meera.rao@example.com',
    licenceNumber: 'KA012016003456',
  },
  TN09GH1122: {
    firstName: 'Vignesh',
    lastName: 'Iyer',
    mobile: '9876543214',
    email: 'vignesh.iyer@example.com',
    licenceNumber: 'TN092012001122',
  },
  RJ14KL7788: {
    firstName: 'Kavya',
    lastName: 'Singh',
    mobile: '9876543211',
    email: 'kavya.singh@example.com',
    licenceNumber: 'RJ142017007788',
  },
  GJ05QW3344: {
    firstName: 'Kavya',
    lastName: 'Singh',
    mobile: '9876543211',
    email: 'kavya.singh@example.com',
    licenceNumber: 'RJ142017007788',
  },
  AP39ZX5566: {
    firstName: 'Meera',
    lastName: 'Rao',
    mobile: '9876543213',
    email: 'meera.rao@example.com',
    licenceNumber: 'KA012016003456',
  },
  WB20LM4433: {
    firstName: 'Kavya',
    lastName: 'Singh',
    mobile: '9876543211',
    email: 'kavya.singh@example.com',
    licenceNumber: 'RJ142017007788',
  },
  MP09RS7711: {
    firstName: 'Vignesh',
    lastName: 'Iyer',
    mobile: '9876543214',
    email: 'vignesh.iyer@example.com',
    licenceNumber: 'TN092012001122',
  },
};

const VEHICLE_UI_META = {
  MH31AB1234: {
    make: 'Hyundai',
    model: 'i20',
    cc: 1197,
    fuelType: 'Petrol',
    color: 'Polar White',
    insuranceExpiry: '2026-12-31',
  },
  RJ14KL7788: {
    make: 'Honda',
    model: 'City',
    cc: 1498,
    fuelType: 'Petrol',
    color: 'Meteoroid Gray',
    insuranceExpiry: '2026-11-30',
  },
  UP32CD5678: {
    make: 'TVS',
    model: 'Jupiter',
    cc: 110,
    fuelType: 'Petrol',
    color: 'Matte Blue',
    insuranceExpiry: '2026-10-15',
  },
  GJ05QW3344: {
    make: 'Maruti Suzuki',
    model: 'Baleno',
    cc: 1197,
    fuelType: 'Petrol',
    color: 'Nexa Blue',
    insuranceExpiry: '2026-09-30',
  },
  DL8CAF9012: {
    make: 'Tata',
    model: 'Ace Gold',
    cc: 694,
    fuelType: 'Diesel',
    color: 'Arctic White',
    insuranceExpiry: '2026-08-31',
  },
  KA01MN3456: {
    make: 'Kia',
    model: 'Sonet',
    cc: 1493,
    fuelType: 'Diesel',
    color: 'Aurora Black',
    insuranceExpiry: '2026-07-31',
  },
  AP39ZX5566: {
    make: 'Hyundai',
    model: 'Venue',
    cc: 998,
    fuelType: 'Petrol',
    color: 'Fiery Red',
    insuranceExpiry: '2026-06-30',
  },
  WB20LM4433: {
    make: 'Honda',
    model: 'Activa 6G',
    cc: 109,
    fuelType: 'Petrol',
    color: 'Black',
    insuranceExpiry: '2026-06-15',
  },
  MP09RS7711: {
    make: 'Ashok Leyland',
    model: 'Dost',
    cc: 1478,
    fuelType: 'Diesel',
    color: 'White',
    insuranceExpiry: '2026-05-31',
  },
  TN09GH1122: {
    make: 'Volkswagen',
    model: 'Virtus',
    cc: 1498,
    fuelType: 'Petrol',
    color: 'Carbon Steel',
    insuranceExpiry: '2026-04-30',
  },
};

const DBS_RECORDS = {
  MH31AB1234: {
    vehicleType: 'Private Car',
    score: 290,
    band: 'Exemplary',
    severityIndex: 8,
    recentTrend: 'Up',
    challanStatus: 'Clear',
    tpLoading: 0,
    purpose: 'clean, near-perfect example',
    violations: [
      {
        date: '2026-02-11',
        type: 'Wrong Parking',
        location: 'Pune',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
    ],
  },
  RJ14KL7788: {
    vehicleType: 'Private Car',
    score: 280,
    band: 'Responsible',
    severityIndex: 16,
    recentTrend: 'Stable',
    challanStatus: 'Clear',
    tpLoading: 0,
    purpose: 'isolated minor lapse',
    violations: [
      {
        date: '2026-01-08',
        type: 'Vehicle Modification',
        location: 'Jaipur',
        thz: 'L',
        status: 'Paid',
        impact: 20,
      },
    ],
  },
  UP32CD5678: {
    vehicleType: 'Two Wheeler',
    score: 260,
    band: 'Average',
    severityIndex: 28,
    recentTrend: 'Down',
    challanStatus: 'Pending',
    tpLoading: 1200,
    purpose: 'average profile with mixed-severity offences',
    violations: [
      {
        date: '2026-02-10',
        type: 'Helmet Violation',
        location: 'Lucknow',
        thz: 'M',
        status: 'Open',
        impact: 30,
      },
      {
        date: '2025-11-18',
        type: 'Wrong Parking',
        location: 'Kanpur',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
    ],
  },
  GJ05QW3344: {
    vehicleType: 'Private Car',
    score: 230,
    band: 'Marginal',
    severityIndex: 40,
    recentTrend: 'Down',
    challanStatus: 'Pending',
    tpLoading: 2400,
    purpose: 'marginal driver with one major and one minor offence',
    violations: [
      {
        date: '2026-03-02',
        type: 'Wrong Lane',
        location: 'Surat',
        thz: 'H',
        status: 'Open',
        impact: 60,
      },
      {
        date: '2025-12-18',
        type: 'Wrong Parking',
        location: 'Surat',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
    ],
  },
  DL8CAF9012: {
    vehicleType: 'Goods Vehicle',
    score: 190,
    band: 'At Risk',
    severityIndex: 55,
    recentTrend: 'Stable',
    challanStatus: 'Pending',
    tpLoading: 3600,
    purpose: 'repeated medium-risk freight example',
    violations: [
      {
        date: '2026-01-25',
        type: 'Overspeeding',
        location: 'Delhi',
        thz: 'H',
        status: 'Paid',
        impact: 80,
      },
      {
        date: '2025-12-12',
        type: 'Vehicle Modification',
        location: 'Delhi',
        thz: 'L',
        status: 'Paid',
        impact: 20,
      },
      {
        date: '2025-10-03',
        type: 'Wrong Parking',
        location: 'Delhi',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
    ],
  },
  KA01MN3456: {
    vehicleType: 'Private Car',
    score: 170,
    band: 'High Risk',
    severityIndex: 68,
    recentTrend: 'Down',
    challanStatus: 'Pending',
    tpLoading: 5200,
    purpose: 'high-risk private car with a serious recent offence',
    violations: [
      {
        date: '2026-03-07',
        type: 'Signal Jump',
        location: 'Bengaluru',
        thz: 'H',
        status: 'Open',
        impact: 90,
      },
      {
        date: '2026-02-19',
        type: 'No Seatbelt',
        location: 'Bengaluru',
        thz: 'M',
        status: 'Paid',
        impact: 30,
      },
      {
        date: '2025-09-14',
        type: 'Wrong Parking',
        location: 'Bengaluru',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
    ],
  },
  AP39ZX5566: {
    vehicleType: 'Private Car',
    score: 130,
    band: 'Serious Risk',
    severityIndex: 80,
    recentTrend: 'Down',
    challanStatus: 'Pending',
    tpLoading: 6800,
    purpose: 'repeated offence multiplier example using repeated vehicle modifications',
    violations: [
      {
        date: '2026-03-14',
        type: 'Wrong Lane',
        location: 'Vijayawada',
        thz: 'H',
        status: 'Open',
        impact: 60,
      },
      {
        date: '2026-02-27',
        type: 'Vehicle Modification',
        location: 'Vijayawada',
        thz: 'L',
        status: 'Open',
        impact: 20,
      },
      {
        date: '2025-12-21',
        type: 'Vehicle Modification',
        location: 'Guntur',
        thz: 'L',
        status: 'Paid',
        impact: 20,
      },
      {
        date: '2025-10-03',
        type: 'Vehicle Modification',
        location: 'Guntur',
        thz: 'L',
        status: 'Paid',
        impact: 40,
      },
      {
        date: '2025-08-18',
        type: 'Helmet Violation',
        location: 'Vijayawada',
        thz: 'M',
        status: 'Paid',
        impact: 30,
      },
    ],
  },
  WB20LM4433: {
    vehicleType: 'Two Wheeler',
    score: 110,
    band: 'Chronic Violator',
    severityIndex: 88,
    recentTrend: 'Down',
    challanStatus: 'Pending',
    tpLoading: 8200,
    purpose: 'chronic repeated helmet violations',
    violations: [
      {
        date: '2026-03-10',
        type: 'No Helmet',
        location: 'Kolkata',
        thz: 'H',
        status: 'Open',
        impact: 30,
      },
      {
        date: '2026-02-05',
        type: 'No Helmet',
        location: 'Kolkata',
        thz: 'H',
        status: 'Paid',
        impact: 30,
      },
      {
        date: '2025-12-30',
        type: 'No Helmet',
        location: 'Kolkata',
        thz: 'H',
        status: 'Paid',
        impact: 60,
      },
      {
        date: '2025-11-02',
        type: 'No Helmet',
        location: 'Kolkata',
        thz: 'H',
        status: 'Paid',
        impact: 60,
      },
      {
        date: '2025-09-19',
        type: 'Wrong Parking',
        location: 'Kolkata',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
    ],
  },
  MP09RS7711: {
    vehicleType: 'Goods Vehicle',
    score: 60,
    band: 'Habitual Offender',
    severityIndex: 94,
    recentTrend: 'Down',
    challanStatus: 'Pending',
    tpLoading: 9600,
    purpose: 'heavy repeated overloading case',
    violations: [
      {
        date: '2026-03-06',
        type: 'Overloading',
        location: 'Bhopal',
        thz: 'H',
        status: 'Open',
        impact: 40,
      },
      {
        date: '2026-01-19',
        type: 'Overloading',
        location: 'Bhopal',
        thz: 'H',
        status: 'Paid',
        impact: 40,
      },
      {
        date: '2025-11-22',
        type: 'Overloading',
        location: 'Bhopal',
        thz: 'H',
        status: 'Paid',
        impact: 80,
      },
      {
        date: '2025-10-10',
        type: 'Overloading',
        location: 'Bhopal',
        thz: 'H',
        status: 'Paid',
        impact: 80,
      },
    ],
  },
  TN09GH1122: {
    vehicleType: 'Private Car',
    score: 20,
    band: 'Extreme Risk',
    severityIndex: 99,
    recentTrend: 'Down',
    challanStatus: 'Pending',
    tpLoading: 12000,
    purpose: 'worst-case driver with mixed severe offences',
    violations: [
      {
        date: '2026-03-11',
        type: 'Drunk Driving',
        location: 'Chennai',
        thz: 'H',
        status: 'Open',
        impact: 100,
      },
      {
        date: '2026-02-22',
        type: 'Overspeeding',
        location: 'Chennai',
        thz: 'H',
        status: 'Open',
        impact: 80,
      },
      {
        date: '2025-12-09',
        type: 'Overspeeding',
        location: 'Chennai',
        thz: 'H',
        status: 'Paid',
        impact: 80,
      },
      {
        date: '2025-10-28',
        type: 'Wrong Parking',
        location: 'Chennai',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
      {
        date: '2025-08-02',
        type: 'Wrong Parking',
        location: 'Chennai',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
    ],
  },
};

function getStorage() {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
}

function toIsoDate(dateString) {
  return `${dateString}T00:00:00+05:30`;
}

function getDateDiffInDays(fromDate, toDate) {
  const diff = new Date(toDate).getTime() - new Date(fromDate).getTime();
  return Math.max(0, Math.floor(diff / (24 * 60 * 60 * 1000)));
}

function getPercentile(score) {
  return Math.max(1, Math.min(99, Math.round((score / DBS_SCORE_CONFIG.max) * 100)));
}

function getTarget(score) {
  if (score >= 285) return 300;
  if (score >= 270) return 285;
  if (score >= 240) return 270;
  if (score >= 210) return 240;
  if (score >= 180) return 210;
  if (score >= 150) return 180;
  if (score >= 120) return 150;
  if (score >= 90) return 120;
  if (score >= 60) return 90;
  return 60;
}

function buildHistory(score, recentTrend) {
  const months = ['Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26'];
  const offsetsByTrend = {
    Up: [18, 14, 10, 7, 3, 0],
    Stable: [6, 5, 4, 3, 1, 0],
    Down: [-32, -24, -16, -10, -5, 0],
  };
  const offsets = offsetsByTrend[recentTrend] ?? offsetsByTrend.Stable;

  return months.map((month, index) => ({
    month,
    score: Math.max(DBS_SCORE_CONFIG.min, Math.min(DBS_SCORE_CONFIG.max, score - offsets[index])),
  }));
}

function buildVehicle(registrationNumber) {
  const record = DBS_RECORDS[registrationNumber];
  const uiMeta = VEHICLE_UI_META[registrationNumber];

  return {
    id: `vehicle-${registrationNumber.toLowerCase()}`,
    registrationNumber,
    type: record.vehicleType,
    make: uiMeta.make,
    model: uiMeta.model,
    cc: uiMeta.cc,
    fuelType: uiMeta.fuelType,
    color: uiMeta.color,
    registrationExpiry: '2027-03-31',
    insurancePolicyNumber: `POL-${registrationNumber}`,
    insuranceExpiry: uiMeta.insuranceExpiry,
    lastSynced: MOCK_REFERENCE_DATE,
  };
}

function buildViolation(registrationNumber, violation, index) {
  const isoDate = toIsoDate(violation.date);
  const daysSinceViolation = getDateDiffInDays(isoDate, MOCK_REFERENCE_DATE);
  const isAgedOut = daysSinceViolation > TWELVE_MONTHS_IN_DAYS;
  const isOpen = violation.status === 'Open';

  return {
    id: `viol-${registrationNumber.toLowerCase()}-${index + 1}`,
    type: violation.type,
    date: isoDate,
    location: violation.location,
    challanNumber: `${registrationNumber}-${String(index + 1).padStart(3, '0')}`,
    scoreImpact: -violation.impact,
    rawImpact: violation.impact,
    impactLevel: violation.impact >= 60 ? 'high' : violation.impact >= 30 ? 'medium' : 'low',
    timeHazardZone: violation.thz === 'H',
    isAgedOut,
    isDisputed: false,
    status: isAgedOut ? 'expired' : isOpen ? 'active' : 'paid',
    amount: violation.impact * 10,
    thz: violation.thz,
  };
}

function getNextMilestone(violations) {
  const nextAgingViolation = [...violations]
    .filter((violation) => !violation.isAgedOut)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  if (!nextAgingViolation) {
    return {
      daysUntilExpiry: 0,
      scoreGainOnExpiry: 0,
      violationType: 'No active challans',
      pointsNeeded: 0,
    };
  }

  const daysSinceViolation = getDateDiffInDays(nextAgingViolation.date, MOCK_REFERENCE_DATE);
  const daysUntilExpiry = Math.max(0, TWELVE_MONTHS_IN_DAYS - daysSinceViolation);

  return {
    daysUntilExpiry,
    scoreGainOnExpiry: Math.abs(nextAgingViolation.scoreImpact),
    violationType: nextAgingViolation.type,
    pointsNeeded: 0,
  };
}

function getProjectionGain(score, daysFromNow) {
  const maxPossibleGain = DBS_SCORE_CONFIG.max - score;
  const projectedGain = Math.round(maxPossibleGain * (daysFromNow / 120));
  return Math.max(4, Math.min(projectedGain, maxPossibleGain));
}

export function getDefaultRegistration() {
  return 'UP32CD5678';
}

export function getSampleUsers() {
  const seenMobiles = new Set();

  return SAMPLE_REGISTRATIONS.reduce((users, registrationNumber) => {
    const profile = SAMPLE_USER_PROFILES[registrationNumber];

    if (seenMobiles.has(profile.mobile)) {
      return users;
    }

    seenMobiles.add(profile.mobile);

    const registrations = getRegistrationsForMobile(profile.mobile);
    const vehicles = registrations.map((vehicleRegistration) => {
      const record = DBS_RECORDS[vehicleRegistration];

      return {
        registrationNumber: vehicleRegistration,
        score: record.score,
        band: record.band,
        vehicleType: record.vehicleType,
      };
    });

    users.push({
      mobile: profile.mobile,
      password: MOCK_PASSWORD,
      otp: MOCK_OTP,
      firstName: profile.firstName,
      lastName: profile.lastName,
      vehicleCount: vehicles.length,
      vehicles,
      registrationNumber: registrations[0],
    });

    return users;
  }, []);
}

export function getRegistrationsForMobile(mobile) {
  const normalizedMobile = mobile?.trim();

  return SAMPLE_REGISTRATIONS.filter(
    (registrationNumber) => SAMPLE_USER_PROFILES[registrationNumber].mobile === normalizedMobile
  );
}

export function getRegistrationForMobile(mobile) {
  return getRegistrationsForMobile(mobile)[0] ?? null;
}

export function getActiveRegistration() {
  const storage = getStorage();
  const stored = storage?.getItem(ACTIVE_REGISTRATION_STORAGE_KEY);
  return stored && DBS_RECORDS[stored] ? stored : getDefaultRegistration();
}

export function setActiveRegistration(registrationNumber) {
  const normalized = registrationNumber?.trim().toUpperCase();
  const nextRegistration = DBS_RECORDS[normalized] ? normalized : getDefaultRegistration();
  const storage = getStorage();

  if (storage) {
    storage.setItem(ACTIVE_REGISTRATION_STORAGE_KEY, nextRegistration);
  }

  return nextRegistration;
}

export function getRecordByRegistration(registrationNumber) {
  const normalized = registrationNumber?.trim().toUpperCase();
  const resolvedRegistration = DBS_RECORDS[normalized] ? normalized : getDefaultRegistration();
  const record = DBS_RECORDS[resolvedRegistration];
  const vehicle = buildVehicle(resolvedRegistration);
  const violations = record.violations.map((violation, index) =>
    buildViolation(resolvedRegistration, violation, index)
  );

  return {
    registrationNumber: resolvedRegistration,
    vehicle,
    score: {
      current: record.score,
      legacyScore: null,
      max: DBS_SCORE_CONFIG.max,
      band: record.band,
      percentile: getPercentile(record.score),
      lastUpdated: MOCK_REFERENCE_DATE,
      target: getTarget(record.score),
      history: buildHistory(record.score, record.recentTrend),
      stats: {
        cleanDays: getDateDiffInDays(
          violations[0]?.date ?? MOCK_REFERENCE_DATE,
          MOCK_REFERENCE_DATE
        ),
        violationsLast12Months: violations.filter((violation) => !violation.isAgedOut).length,
        streak: {
          currentDays: getDateDiffInDays(
            violations[0]?.date ?? MOCK_REFERENCE_DATE,
            MOCK_REFERENCE_DATE
          ),
          bestDays:
            getDateDiffInDays(violations[0]?.date ?? MOCK_REFERENCE_DATE, MOCK_REFERENCE_DATE) + 42,
        },
      },
      nextMilestone: getNextMilestone(violations),
      simulator: {
        projections: [30, 60, 90].map((daysFromNow) => ({
          scenario: `No new challans for ${daysFromNow} days`,
          daysFromNow,
          scoreGain: getProjectionGain(record.score, daysFromNow),
        })),
      },
      severityIndex: record.severityIndex,
      recentTrend: record.recentTrend,
      challanStatus: record.challanStatus,
      tpLoading: record.tpLoading,
      purpose: record.purpose,
    },
    violations,
    insurance: {
      vehicle: {
        registrationNumber: vehicle.registrationNumber,
        make: vehicle.make,
        cc: vehicle.cc,
        fuelType: vehicle.fuelType,
      },
      policy: {
        expiryDate: vehicle.insuranceExpiry,
      },
      pricing: {
        standardTPPremium: 2450,
        dbsAdjustedPremium: 2450 + record.tpLoading,
        loadingAmount: record.tpLoading,
        discountAmount: record.tpLoading === 0 ? 122 : 0,
        tpPremiumDiscount: record.tpLoading === 0 ? 122 : 0,
      },
      insurers: [
        {
          id: 'insurer-001',
          name: 'ICICI Lombard',
          logoUrl: '',
          tpPremium: 2450 + record.tpLoading,
          odFromPremium: 4200,
          premiumForCurrentDBS: 2450 + record.tpLoading,
          discountPercent: record.tpLoading === 0 ? 5 : 0,
          dbsParticipating: true,
          quoteUrl: 'https://example.com/quote/icici',
          rating: 4.5,
          reviews: 2840,
          features: ['Cashless claims', 'Fast renewal', '24x7 support'],
        },
        {
          id: 'insurer-002',
          name: 'Bajaj Allianz',
          logoUrl: '',
          tpPremium: 2510 + record.tpLoading,
          odFromPremium: 4100,
          premiumForCurrentDBS: 2510 + record.tpLoading,
          discountPercent: record.tpLoading === 0 ? 4 : 0,
          dbsParticipating: true,
          quoteUrl: 'https://example.com/quote/bajaj',
          rating: 4.4,
          reviews: 3120,
          features: ['Roadside assistance', 'Paperless process', 'NCB support'],
        },
        {
          id: 'insurer-003',
          name: 'Bharti AXA',
          logoUrl: '',
          tpPremium: 2590 + record.tpLoading,
          odFromPremium: 4050,
          premiumForCurrentDBS: 2590 + record.tpLoading,
          discountPercent: 0,
          dbsParticipating: false,
          quoteUrl: 'https://example.com/quote/bharti',
          rating: 4.3,
          reviews: 1950,
          features: ['Mobile app', 'Quick support', 'Flexible add-ons'],
        },
      ],
      renewalHistory: [
        {
          year: 2025,
          provider: 'ICICI Lombard',
          premium: 2450 + record.tpLoading,
          band: record.band,
        },
        {
          year: 2024,
          provider: 'Bajaj Allianz',
          premium: 2680 + Math.round(record.tpLoading / 2),
          band: 'Average',
        },
        {
          year: 2023,
          provider: 'ICICI Lombard',
          premium: 2900 + Math.round(record.tpLoading / 2),
          band: 'Marginal',
        },
      ],
    },
  };
}

export function getActiveMockRecord() {
  return getRecordByRegistration(getActiveRegistration());
}

export function getMockUser(registrationNumber = getActiveRegistration()) {
  const activeRecord = getRecordByRegistration(registrationNumber);
  const profile = SAMPLE_USER_PROFILES[activeRecord.registrationNumber];
  const registrations = getRegistrationsForMobile(profile.mobile);
  const vehicles = registrations.map((vehicleRegistration) => buildVehicle(vehicleRegistration));

  return {
    id: `user-${profile.mobile}`,
    firstName: profile.firstName,
    lastName: profile.lastName,
    mobile: profile.mobile,
    email: profile.email,
    profilePhotoUrl: '',
    createdAt: '2024-01-15T10:30:00Z',
    licence: {
      number: profile.licenceNumber,
      dob: '1990-04-22',
      expiryDate: '2027-12-31',
    },
    activeVehicleId: activeRecord.vehicle.id,
    activeRegistrationNumber: activeRecord.registrationNumber,
    vehicles,
    notificationsEnabled: true,
    isVerified: true,
  };
}

export function getMockUserByMobile(mobile) {
  const registrations = getRegistrationsForMobile(mobile);

  if (!registrations.length) {
    return null;
  }

  const currentRegistration = getActiveRegistration();
  const activeRegistration = registrations.includes(currentRegistration)
    ? currentRegistration
    : registrations[0];

  return getMockUser(activeRegistration);
}

export function getMockScore() {
  return getActiveMockRecord().score;
}

export function getMockViolations() {
  return getActiveMockRecord().violations;
}

export function getMockInsurance() {
  return getActiveMockRecord().insurance;
}
