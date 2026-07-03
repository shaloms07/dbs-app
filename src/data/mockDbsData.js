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
  'MH12SC7788',
  'MH34UV4444',
  'MH12AB5555',
  'MH34CD6666',
  'DL99ZZ0001',
  'DL8CAF9012',
  'TN09GH1122',
  'TN22JK9999',
  'RJ14KL7788',
  'GJ05QW3344',
];

const SAMPLE_USER_PROFILES = {
  MH31AB1234: {
    firstName: 'Aarav',
    lastName: 'Deshmukh',
    mobile: '9876543210',
    email: 'aarav.deshmukh@example.com',
    licenceNumber: 'MH1220150001234',
    residenceCity: 'Nagpur',
    residenceState: 'Maharashtra',
  },
  MH12SC7788: {
    firstName: 'Aarav',
    lastName: 'Deshmukh',
    mobile: '9876543210',
    email: 'aarav.deshmukh@example.com',
    licenceNumber: 'MH1220150001234',
    residenceCity: 'Nagpur',
    residenceState: 'Maharashtra',
  },
  MH34UV4444: {
    firstName: 'Aarav',
    lastName: 'Deshmukh',
    mobile: '9876543210',
    email: 'aarav.deshmukh@example.com',
    licenceNumber: 'MH1220150001234',
    residenceCity: 'Nagpur',
    residenceState: 'Maharashtra',
  },
  MH12AB5555: {
    firstName: 'Saanvi',
    lastName: 'Patil',
    mobile: '9876543220',
    email: 'saanvi.patil@example.com',
    licenceNumber: 'MH122019005555',
    residenceCity: 'Mumbai',
    residenceState: 'Maharashtra',
  },
  MH34CD6666: {
    firstName: 'Saanvi',
    lastName: 'Patil',
    mobile: '9876543220',
    email: 'saanvi.patil@example.com',
    licenceNumber: 'MH122019005555',
    residenceCity: 'Mumbai',
    residenceState: 'Maharashtra',
  },
  DL99ZZ0001: {
    firstName: 'Kabir',
    lastName: 'Malhotra',
    mobile: '9876543225',
    email: 'kabir.malhotra@example.com',
    licenceNumber: 'DL992021000001',
    residenceCity: 'Delhi',
    residenceState: 'Delhi',
  },
  DL8CAF9012: {
    firstName: 'Kabir',
    lastName: 'Malhotra',
    mobile: '9876543225',
    email: 'kabir.malhotra@example.com',
    licenceNumber: 'DL992021000001',
    residenceCity: 'Delhi',
    residenceState: 'Delhi',
  },
  TN09GH1122: {
    firstName: 'Vignesh',
    lastName: 'Iyer',
    mobile: '9876543214',
    email: 'vignesh.iyer@example.com',
    licenceNumber: 'TN092012001122',
    residenceCity: 'Chennai',
    residenceState: 'Tamil Nadu',
  },
  TN22JK9999: {
    firstName: 'Vignesh',
    lastName: 'Iyer',
    mobile: '9876543214',
    email: 'vignesh.iyer@example.com',
    licenceNumber: 'TN092012001122',
    residenceCity: 'Chennai',
    residenceState: 'Tamil Nadu',
  },
  RJ14KL7788: {
    firstName: 'Kavya',
    lastName: 'Singh',
    mobile: '9876543211',
    email: 'kavya.singh@example.com',
    licenceNumber: 'RJ142017007788',
    residenceCity: 'Pune',
    residenceState: 'Maharashtra',
  },
  GJ05QW3344: {
    firstName: 'Kavya',
    lastName: 'Singh',
    mobile: '9876543211',
    email: 'kavya.singh@example.com',
    licenceNumber: 'RJ142017007788',
    residenceCity: 'Surat',
    residenceState: 'Gujarat',
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
  MH12SC7788: {
    make: 'Honda',
    model: 'Activa 125',
    cc: 124,
    fuelType: 'Petrol',
    color: 'Pearl Igneous Black',
    insuranceExpiry: '2026-09-25',
  },
  MH34UV4444: {
    make: 'Piaggio',
    model: 'Ape Passenger',
    cc: 395,
    fuelType: 'CNG',
    color: 'Yellow',
    insuranceExpiry: '2026-10-18',
  },
  MH12AB5555: {
    make: 'Tata',
    model: 'Nexon',
    cc: 1199,
    fuelType: 'Petrol',
    color: 'Grassland Beige',
    insuranceExpiry: '2026-08-31',
  },
  MH34CD6666: {
    make: 'TVS',
    model: 'Jupiter',
    cc: 110,
    fuelType: 'Petrol',
    color: 'Matte Blue',
    insuranceExpiry: '2026-09-15',
  },
  DL99ZZ0001: {
    make: 'Kia',
    model: 'Seltos',
    cc: 1497,
    fuelType: 'Petrol',
    color: 'Intense Red',
    insuranceExpiry: '2026-10-05',
  },
  DL8CAF9012: {
    make: 'Tata',
    model: 'Ace Gold',
    cc: 7500,
    fuelType: 'Diesel',
    color: 'Arctic White',
    insuranceExpiry: '2026-08-31',
  },
  TN09GH1122: {
    make: 'Volkswagen',
    model: 'Virtus',
    cc: 1498,
    fuelType: 'Petrol',
    color: 'Carbon Steel',
    insuranceExpiry: '2026-04-30',
  },
  TN22JK9999: {
    make: 'TVS',
    model: 'iQube',
    cc: 115,
    fuelType: 'Electric',
    color: 'Titanium Grey',
    insuranceExpiry: '2026-12-12',
  },
  RJ14KL7788: {
    make: 'Ashok Leyland',
    model: 'Dost',
    cc: 7500,
    fuelType: 'Diesel',
    color: 'White',
    insuranceExpiry: '2026-11-30',
  },
  GJ05QW3344: {
    make: 'Force',
    model: 'Traveller Bus',
    cc: 2596,
    fuelType: 'Diesel',
    color: 'Silver',
    insuranceExpiry: '2026-09-30',
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
    purpose: 'clean, near-perfect private car example',
    violations: [
      {
        date: '2026-02-11',
        type: 'Wrong Parking',
        location: 'Nagpur',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
    ],
  },
  MH12SC7788: {
    vehicleType: 'Two Wheeler',
    score: 275,
    band: 'Responsible',
    severityIndex: 15,
    recentTrend: 'Up',
    challanStatus: 'Clear',
    tpLoading: 0,
    purpose: 'responsible scooter example',
    violations: [
      {
        date: '2026-01-17',
        type: 'Wrong Parking',
        location: 'Mumbai',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
    ],
  },
  MH34UV4444: {
    vehicleType: 'Passenger Vehicle',
    score: 285,
    band: 'Exemplary',
    severityIndex: 5,
    recentTrend: 'Stable',
    challanStatus: 'Clear',
    tpLoading: 0,
    purpose: 'clean passenger vehicle (3-wheeler)',
    violations: [],
  },
  MH12AB5555: {
    vehicleType: 'Private Car',
    score: 255,
    band: 'Average',
    severityIndex: 25,
    recentTrend: 'Stable',
    challanStatus: 'Pending',
    tpLoading: 0,
    purpose: 'average private car with pending violations',
    violations: [
      {
        date: '2026-02-14',
        type: 'Wrong Parking',
        location: 'Mumbai',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
      {
        date: '2025-11-18',
        type: 'Safety Measures',
        location: 'Mumbai',
        thz: 'M',
        status: 'Open',
        impact: 30,
      },
    ],
  },
  MH34CD6666: {
    vehicleType: 'Two Wheeler',
    score: 220,
    band: 'Marginal',
    severityIndex: 40,
    recentTrend: 'Down',
    challanStatus: 'Pending',
    tpLoading: 800,
    purpose: 'marginal two wheeler with higher loading',
    violations: [
      {
        date: '2026-01-29',
        type: 'Helmet Violation',
        location: 'Pune',
        thz: 'M',
        status: 'Open',
        impact: 30,
      },
      {
        date: '2025-12-15',
        type: 'Over Speeding',
        location: 'Pune',
        thz: 'H',
        status: 'Paid',
        impact: 80,
      },
    ],
  },
  DL99ZZ0001: {
    vehicleType: 'Private Car',
    score: 195,
    band: 'At Risk',
    severityIndex: 52,
    recentTrend: 'Stable',
    challanStatus: 'Pending',
    tpLoading: 3600,
    purpose: 'at risk driver with repeated offences',
    violations: [
      {
        date: '2026-02-20',
        type: 'Wrong Parking',
        location: 'Delhi',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
      {
        date: '2026-01-10',
        type: 'Wrong Lane / No Entry',
        location: 'Delhi',
        thz: 'M',
        status: 'Open',
        impact: 60,
      },
      {
        date: '2025-11-05',
        type: 'Over Speeding',
        location: 'Delhi',
        thz: 'H',
        status: 'Paid',
        impact: 80,
      },
    ],
  },
  DL8CAF9012: {
    vehicleType: 'Goods Vehicle',
    score: 165,
    band: 'High Risk',
    severityIndex: 65,
    recentTrend: 'Down',
    challanStatus: 'Pending',
    tpLoading: 5200,
    purpose: 'high risk goods vehicle',
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
        type: 'Wrong Lane',
        location: 'Delhi',
        thz: 'M',
        status: 'Open',
        impact: 60,
      },
    ],
  },
  TN09GH1122: {
    vehicleType: 'Private Car',
    score: 135,
    band: 'Serious Risk',
    severityIndex: 78,
    recentTrend: 'Down',
    challanStatus: 'Pending',
    tpLoading: 6800,
    purpose: 'serious risk private car',
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
  TN22JK9999: {
    vehicleType: 'Two Wheeler',
    score: 115,
    band: 'Chronic Violator',
    severityIndex: 85,
    recentTrend: 'Stable',
    challanStatus: 'Clear',
    tpLoading: 8200,
    purpose: 'chronic violator two-wheeler',
    violations: [
      {
        date: '2026-01-18',
        type: 'No Helmet Strap',
        location: 'Chennai',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
      {
        date: '2025-12-05',
        type: 'Signal Jump',
        location: 'Chennai',
        thz: 'H',
        status: 'Paid',
        impact: 90,
      },
      {
        date: '2025-10-15',
        type: 'Over Speeding',
        location: 'Chennai',
        thz: 'H',
        status: 'Paid',
        impact: 80,
      },
      {
        date: '2025-08-20',
        type: 'Wrong Parking',
        location: 'Chennai',
        thz: 'L',
        status: 'Paid',
        impact: 10,
      },
    ],
  },
  RJ14KL7788: {
    vehicleType: 'Goods Vehicle',
    score: 85,
    band: 'Habitual Offender',
    severityIndex: 92,
    recentTrend: 'Down',
    challanStatus: 'Pending',
    tpLoading: 9600,
    purpose: 'habitual offender goods vehicle',
    violations: [
      {
        date: '2026-03-06',
        type: 'Overloading',
        location: 'Jaipur',
        thz: 'H',
        status: 'Open',
        impact: 40,
      },
      {
        date: '2026-01-19',
        type: 'Overloading',
        location: 'Jaipur',
        thz: 'H',
        status: 'Paid',
        impact: 40,
      },
      {
        date: '2025-11-22',
        type: 'Overloading',
        location: 'Jaipur',
        thz: 'H',
        status: 'Paid',
        impact: 80,
      },
      {
        date: '2025-10-10',
        type: 'Overloading',
        location: 'Jaipur',
        thz: 'H',
        status: 'Paid',
        impact: 80,
      },
    ],
  },
  GJ05QW3344: {
    vehicleType: 'Passenger Vehicle',
    score: 45,
    band: 'Extreme Risk',
    severityIndex: 98,
    recentTrend: 'Down',
    challanStatus: 'Pending',
    tpLoading: 12000,
    purpose: 'extreme risk passenger vehicle (bus)',
    violations: [
      {
        date: '2026-03-02',
        type: 'Dangerous Driving',
        location: 'Surat',
        thz: 'H',
        status: 'Open',
        impact: 90,
      },
      {
        date: '2026-02-10',
        type: 'Drunk Driving',
        location: 'Surat',
        thz: 'H',
        status: 'Open',
        impact: 100,
      },
      {
        date: '2026-01-05',
        type: 'Disobeying Police',
        location: 'Surat',
        thz: 'H',
        status: 'Paid',
        impact: 90,
      },
      {
        date: '2025-11-20',
        type: 'Over Speeding',
        location: 'Surat',
        thz: 'H',
        status: 'Paid',
        impact: 80,
      },
      {
        date: '2025-09-15',
        type: 'Safety Measures',
        location: 'Surat',
        thz: 'M',
        status: 'Paid',
        impact: 30,
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
  return 'MH31AB1234';
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
    residenceCity: profile.residenceCity,
    residenceState: profile.residenceState,
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
