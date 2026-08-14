import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@components/BottomNav';
import VehicleSwitcher from '@components/VehicleSwitcher';
import ScoreGauge from '@components/ScoreGauge';
import Badge from '@components/ui/Badge';
import ErrorState from '@components/ui/ErrorState';
import FullPageSpinner from '@components/ui/FullPageSpinner';
import InAppBrowser from '@components/ui/InAppBrowser';
import InsuranceRenewalBanner from '@components/InsuranceRenewalBanner';
import { useUser } from '@context/UserContext';
import { useScore } from '@hooks/useScore';
import { useInsurance } from '@hooks/useInsurance';
import { useViolations } from '@hooks/useViolations';
import { getBand } from '@constants/scoreBands';
import whiteLogo from '../media/Trafficrewards Logo-White.png';

// --- Violation Model ---
const violationModel = [
  {
    code: 'THZ 1',
    name: 'Drunk Driving',
    points: 100,
    keywords: ['drunk', 'alcohol', 'intoxicated', 'influence of alcohol', 'drugs'],
  },
  {
    code: 'THZ 2',
    name: 'Dangerous Driving',
    points: 90,
    keywords: [
      'jumping red light',
      'signal jump',
      'red light',
      'violating stop sign',
      'stop sign',
      'handheld',
      'mobile phone',
      'texting',
      'overtaking',
      'passing vehicle',
      'against traffic',
      'wrong flow',
      'dangerous driving',
      'reckless',
      'mentally unfit',
      'physically unfit',
    ],
  },
  {
    code: 'THZ 3',
    name: 'Disobeying Police',
    points: 90,
    keywords: [
      'disobey police',
      'misbehavior',
      'police officer',
      'withholding information',
      'refused police',
    ],
  },
  {
    code: 'THZ 4',
    name: 'Over Speeding',
    points: 80,
    keywords: [
      'overspeed',
      'over speeding',
      'speed limit',
      'racing',
      'above permitted speed',
      'without speed governor',
    ],
  },
  {
    code: 'THZ 5',
    name: 'Driving Without License/Insurance/PUCC',
    points: 70,
    keywords: [
      'without license',
      'no license',
      'without insurance',
      'expired insurance',
      'disqualified',
      'juvenile',
      'unauthorized person',
      'without pucc',
      'no pucc',
    ],
  },
  {
    code: 'THZ 6',
    name: 'Wrong Lane / No Entry',
    points: 60,
    keywords: ['wrong lane', 'proper lane', 'foot path', 'footpath', 'no entry', 'nmv lane'],
  },
  {
    code: 'THZ 7',
    name: 'Hazardous Goods Carriage',
    points: 50,
    keywords: [
      'hazardous goods',
      'dangerous goods',
      'carriage by road act',
      'transport dangerous goods',
    ],
  },
  {
    code: 'THZ 8',
    name: 'Traffic Signs Violation',
    points: 50,
    keywords: ['yellow line', 'mandatory sign', 'traffic sign'],
  },
  {
    code: 'THZ 9',
    name: 'Overloading',
    points: 40,
    keywords: [
      'overloading',
      'extra passenger',
      'weight limit',
      'high load',
      'long load',
      'extra passenger on driver seat',
      'two wheeler overloading',
    ],
  },
  {
    code: 'THZ 10',
    name: 'Safety Measures',
    points: 30,
    keywords: [
      'without helmet',
      'helmet',
      'seat belt',
      'seatbelt',
      'child restraint',
      'unsafe vehicle',
      'unfit vehicle',
    ],
  },
  {
    code: 'THZ 11',
    name: 'Vehicle Modification',
    points: 20,
    keywords: [
      'vehicle modification',
      'retro fitting',
      'modified silencer',
      'pressure horn',
      'rupd',
      'lupd',
    ],
  },
  {
    code: 'THZ 12',
    name: 'Wrong Parking',
    points: 10,
    keywords: [
      'wrong parking',
      'improper parking',
      'obstructive parking',
      'picking passenger without stand',
    ],
  },
];

// --- TP Premium Data ---
const tpPremiumData = {
  private_car: [
    { cc: '0-1000', premium: 2094 },
    { cc: '1000-1500', premium: 3416 },
    { cc: '1500+', premium: 7897 },
  ],
  two_wheeler: [
    { cc: '0-75', premium: 538 },
    { cc: '75-150', premium: 714 },
    { cc: '150-350', premium: 1366 },
    { cc: '350+', premium: 2804 },
  ],
  goods_vehicle_gvw: [
    { gvw: '0-7500', premium: 16049 },
    { gvw: '7500-12000', premium: 27000 },
    { gvw: '12000-20000', premium: 35313 },
    { gvw: '20000-25000', premium: 43804 },
    { gvw: '25000-30000', premium: 49304 },
    { gvw: '30000+', premium: 52104 },
  ],
  passenger_vehicle: {
    public_service: [
      { type: '3-wheeler (passenger)', premium_per_seat: 1390 },
      { type: 'Bus', premium_driver: 10239, premium_per_seat: 873 },
    ],
    private_service: [{ type: 'Bus', premium_driver: 6946, premium_per_seat: 693 }],
    educational: [{ type: 'Bus', premium_driver: 6697, premium_per_seat: 673 }],
  },
};

// --- Premium Adjustment Table ---
const premiumAdjustments = [
  {
    min: 285,
    max: 300,
    category: 'Exemplary',
    adjustment: -20,
    label: '−20% Discount',
    type: 'discount',
  },
  {
    min: 270,
    max: 284,
    category: 'Responsible',
    adjustment: -10,
    label: '−10% Discount',
    type: 'discount',
  },
  {
    min: 240,
    max: 269,
    category: 'Average',
    adjustment: 25,
    label: '+25% Loading',
    type: 'loading',
  },
  {
    min: 210,
    max: 239,
    category: 'Marginal',
    adjustment: 50,
    label: '+50% Loading',
    type: 'loading',
  },
  {
    min: 180,
    max: 209,
    category: 'At Risk',
    adjustment: 75,
    label: '+75% Loading',
    type: 'loading',
  },
  {
    min: 150,
    max: 179,
    category: 'High Risk',
    adjustment: 100,
    label: '+100% Loading',
    type: 'loading',
  },
  {
    min: 120,
    max: 149,
    category: 'Serious Risk',
    adjustment: 125,
    label: '+125% Loading',
    type: 'loading',
  },
  {
    min: 90,
    max: 119,
    category: 'Chronic Violator',
    adjustment: 150,
    label: '+150% Loading',
    type: 'loading',
  },
  {
    min: 60,
    max: 89,
    category: 'Habitual Offender',
    adjustment: 175,
    label: '+175% Loading',
    type: 'loading',
  },
  {
    min: 0,
    max: 59,
    category: 'Extreme Risk',
    adjustment: 200,
    label: '+200% (Cap)',
    type: 'loading',
  },
];

// --- Helpers ---

function getBasePremium(vehicleType, cc) {
  const type = vehicleType?.toLowerCase() || '';
  if (
    type.includes('two wheeler') ||
    type.includes('2 wheeler') ||
    type.includes('scooter') ||
    type.includes('bike')
  ) {
    const slabs = tpPremiumData.two_wheeler;
    if (cc <= 75) return slabs[0].premium;
    if (cc <= 150) return slabs[1].premium;
    if (cc <= 350) return slabs[2].premium;
    return slabs[3].premium;
  }
  if (type.includes('goods') || type.includes('commercial') || type.includes('truck')) {
    const slabs = tpPremiumData.goods_vehicle_gvw;
    // Use cc as an approximate GVW for goods vehicles
    if (cc <= 7500) return slabs[0].premium;
    if (cc <= 12000) return slabs[1].premium;
    if (cc <= 20000) return slabs[2].premium;
    if (cc <= 25000) return slabs[3].premium;
    if (cc <= 30000) return slabs[4].premium;
    return slabs[5].premium;
  }
  // Default to private car
  const slabs = tpPremiumData.private_car;
  if (cc <= 1000) return slabs[0].premium;
  if (cc <= 1500) return slabs[1].premium;
  return slabs[2].premium;
}

function getAdjustmentForScore(score) {
  return (
    premiumAdjustments.find((a) => score >= a.min && score <= a.max) ??
    premiumAdjustments[premiumAdjustments.length - 1]
  );
}

function matchViolationToModel(violationType) {
  const lowered = (violationType || '').toLowerCase();
  for (const model of violationModel) {
    for (const keyword of model.keywords) {
      if (lowered.includes(keyword)) {
        return model;
      }
    }
  }
  return null;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// --- Tabs ---
const TABS = ['overview', 'challans', 'premium'];

export default function InsuranceScreen() {
  const navigate = useNavigate();
  const { user, activeVehicle } = useUser();
  const { score, loading: scoreLoading, error: scoreError, refetch: refetchScore } = useScore();
  const {
    insurance,
    insurers,
    loading: insuranceLoading,
    error: insuranceError,
    refetch: refetchInsurance,
  } = useInsurance();
  const { violations, loading: violationsLoading } = useViolations(1, 100);
  const [activeTab, setActiveTab] = useState('overview');

  const loading = scoreLoading || insuranceLoading;
  const error = scoreError || insuranceError;

  const computedData = useMemo(() => {
    if (!score || !activeVehicle) return null;
    const currentScore = score.current;
    const band = getBand(currentScore);
    const adjustment = getAdjustmentForScore(currentScore);
    const basePremium = getBasePremium(activeVehicle.type, activeVehicle.cc);
    const adjustmentAmount = Math.round(basePremium * (adjustment.adjustment / 100));
    const adjustedPremium = basePremium + adjustmentAmount;
    const isDiscount = adjustment.type === 'discount';

    // Classify violations
    const classifiedViolations = (violations || []).map((v) => {
      const matched = matchViolationToModel(v.type);
      return {
        ...v,
        thzCode: matched?.code ?? '—',
        thzName: matched?.name ?? v.type,
        thzPoints: matched?.points ?? 0,
      };
    });

    // Total impact
    const totalImpact = classifiedViolations.reduce((sum, v) => sum + Math.abs(v.scoreImpact), 0);

    return {
      currentScore,
      band,
      adjustment,
      basePremium,
      adjustmentAmount,
      adjustedPremium,
      isDiscount,
      classifiedViolations,
      totalImpact,
    };
  }, [score, activeVehicle, violations]);

  if (loading && !score) return <FullPageSpinner />;
  if (error && !score)
    return (
      <ErrorState
        message={error}
        onRetry={() => {
          refetchScore();
          refetchInsurance();
        }}
      />
    );
  if (!user || !score || !computedData) return <FullPageSpinner />;

  const {
    currentScore,
    band,
    adjustment,
    basePremium,
    adjustmentAmount,
    adjustedPremium,
    isDiscount,
    classifiedViolations,
    totalImpact,
  } = computedData;

  return (
    <div className="screen-wrap bg-transparent pb-28">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/85 backdrop-blur-xl">
        <div className="screen-main px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/home')}
              className="rounded-2xl border border-white/70 bg-white/90 p-2.5 shadow-sm"
              aria-label="Back"
            >
              ←
            </button>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">Insurance</h1>
              <p className="text-xs text-neutral-600">DBS score impact on your premium</p>
            </div>
          </div>
          <div className="mt-3">
            <VehicleSwitcher />
          </div>
        </div>
      </header>

      <main className="screen-main space-y-5 px-4 py-5">
        {/* Hero Card — Score & Premium Overview */}
        <section className="surface-card-strong brand-gradient rounded-[34px] px-5 pb-6 pt-6 text-white">
          <img
            src={whiteLogo}
            alt="TrafficRewards"
            className="mx-auto mb-2 h-auto w-36 opacity-95"
          />
          <ScoreGauge score={currentScore} showValue={false} />
          <div className="-mt-2 text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/65">DBS Score</p>
            <div className="mt-2 flex items-end justify-center gap-2">
              <span className="text-5xl font-black leading-none text-white">{currentScore}</span>
              <span className="pb-1 text-lg font-semibold text-white/70">/ 300</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: band.color }} />
              <span className="text-sm font-semibold">{band.label}</span>
            </div>
          </div>
          <div className="mt-4 rounded-[24px] border border-white/20 bg-white/10 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/70">Premium Impact</p>
                <p className="mt-1 text-2xl font-bold">
                  {isDiscount ? adjustment.label : adjustment.label}
                </p>
              </div>
              <div
                className={`rounded-2xl px-4 py-2 text-right ${isDiscount ? 'bg-emerald-500/25' : 'bg-red-500/25'}`}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                  {isDiscount ? 'You save' : 'Extra loading'}
                </p>
                <p className="text-lg font-bold">{formatCurrency(Math.abs(adjustmentAmount))}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Snapshot Cards */}
        <section className="grid grid-cols-3 gap-3">
          <PremiumStatCard
            label="Base TP"
            value={formatCurrency(basePremium)}
            accent="text-brand-700"
          />
          <PremiumStatCard
            label={isDiscount ? 'Discount' : 'Loading'}
            value={`${isDiscount ? '−' : '+'}${formatCurrency(Math.abs(adjustmentAmount))}`}
            accent={isDiscount ? 'text-emerald-600' : 'text-red-600'}
          />
          <PremiumStatCard
            label="Adjusted"
            value={formatCurrency(adjustedPremium)}
            accent="text-brand-900"
          />
        </section>

        {/* Tab Switcher */}
        <section className="surface-card rounded-[30px] px-4 py-4">
          <div className="flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-[linear-gradient(135deg,#273471,#0058D1_70%,#00D3FF)] text-white shadow-[0_8px_20px_rgba(0,88,209,0.25)]'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewTab
            score={currentScore}
            band={band}
            adjustment={adjustment}
            basePremium={basePremium}
            adjustedPremium={adjustedPremium}
            adjustmentAmount={adjustmentAmount}
            isDiscount={isDiscount}
            vehicle={activeVehicle}
            insurance={insurance}
            totalImpact={totalImpact}
            violationCount={classifiedViolations.filter((v) => !v.isAgedOut).length}
            onViewOffers={() => setActiveTab('premium')}
          />
        )}

        {activeTab === 'challans' && (
          <ChallansTab violations={classifiedViolations} loading={violationsLoading} />
        )}

        {activeTab === 'premium' && (
          <PremiumTab
            currentScore={currentScore}
            vehicle={activeVehicle}
            basePremium={basePremium}
            adjustedPremium={adjustedPremium}
            insurers={insurers}
          />
        )}
      </main>

      <BottomNav />
    </div>
  );
}

// ─── Sub-Components ──────────────────────────────────────────────────

function PremiumStatCard({ label, value, accent }) {
  return (
    <article className="surface-card rounded-[22px] border border-white/70 brand-gradient-soft p-3 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {label}
      </p>
      <p className={`mt-2 text-lg font-bold ${accent}`}>{value}</p>
    </article>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────

function OverviewTab({
  score,
  band,
  adjustment,
  basePremium,
  adjustedPremium,
  adjustmentAmount,
  isDiscount,
  vehicle,
  insurance,
  totalImpact,
  violationCount,
  onViewOffers,
}) {
  return (
    <div className="space-y-4">
      {/* Insurance Renewal Banner */}
      {insurance?.policy?.expiryDate && (
        <InsuranceRenewalBanner
          expiryDate={insurance.policy.expiryDate}
          onViewOffers={onViewOffers}
        />
      )}

      {/* How score affects insurance */}
      <section className="surface-card rounded-[28px] p-5">
        <h3 className="text-lg font-bold text-neutral-900">How Your Score Affects Insurance</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Your DBS (Driver Behaviour Score) directly impacts your Third-Party insurance premium. A
          higher score means lower premiums through discounts, while a lower score results in
          additional loading charges.
        </p>

        <div className="mt-4 space-y-3">
          <InfoRow label="Current Score" value={`${score} / 300`} />
          <InfoRow label="Score Band" value={band.label}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: band.color }} />
          </InfoRow>
          <InfoRow label="Vehicle Type" value={vehicle?.type || '—'} />
          <InfoRow label="Engine Capacity" value={vehicle?.cc ? `${vehicle.cc} cc` : '—'} />
          <InfoRow
            label="Active Violations"
            value={`${violationCount} challan${violationCount !== 1 ? 's' : ''}`}
          />
          <InfoRow label="Total Score Impact" value={`−${totalImpact} pts`} />
        </div>
      </section>

      {/* Premium Breakdown */}
      <section className="surface-card rounded-[28px] p-5">
        <h3 className="text-lg font-bold text-neutral-900">Premium Breakdown</h3>
        <div className="mt-4 space-y-0 overflow-hidden rounded-2xl border border-neutral-200">
          <PremiumRow label="Standard TP Premium" value={formatCurrency(basePremium)} />
          <PremiumRow
            label={
              isDiscount
                ? `DBS Discount (${adjustment.label})`
                : `DBS Loading (${adjustment.label})`
            }
            value={`${isDiscount ? '−' : '+'}${formatCurrency(Math.abs(adjustmentAmount))}`}
            highlight
            isDiscount={isDiscount}
          />
          <PremiumRow label="Your Adjusted Premium" value={formatCurrency(adjustedPremium)} bold />
        </div>
      </section>

      {/* Insurance Policy Info */}
      {insurance?.policy && (
        <section className="surface-card rounded-[28px] p-5">
          <h3 className="text-lg font-bold text-neutral-900">Current Policy</h3>
          <div className="mt-4 space-y-3">
            <InfoRow
              label="Policy Expiry"
              value={new Date(insurance.policy.expiryDate).toLocaleDateString('en-IN')}
            />
            {insurance.vehicle && (
              <>
                <InfoRow label="Vehicle" value={`${insurance.vehicle.make ?? ''}`} />
                <InfoRow label="Fuel Type" value={insurance.vehicle.fuelType || '—'} />
              </>
            )}
          </div>
        </section>
      )}

      {/* Score Improvement Tip */}
      <section className="surface-card-strong w-full rounded-[28px] bg-[linear-gradient(135deg,#273471,#0058D1_60%,#00D3FF)] p-5 text-white">
        <p className="text-xs uppercase tracking-[0.24em] text-white/70">💡 Tip</p>
        <h3 className="mt-2 text-lg font-bold">
          {isDiscount
            ? 'Maintain your clean driving record!'
            : 'Improve your score to reduce premiums'}
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          {isDiscount
            ? `You're saving ${formatCurrency(Math.abs(adjustmentAmount))} thanks to your excellent driving record. Keep it up!`
            : `Each band improvement can save you significantly. With ${violationCount} active challan${violationCount !== 1 ? 's' : ''}, clearing them and maintaining clean driving will boost your score.`}
        </p>
      </section>
    </div>
  );
}

// ─── Challans Tab ─────────────────────────────────────────────────────

function ChallansTab({ violations, loading }) {
  if (loading) return <FullPageSpinner />;

  const activeViolations = violations.filter((v) => !v.isAgedOut);
  const agedOutViolations = violations.filter((v) => v.isAgedOut);

  return (
    <div className="space-y-4">
      {/* Active Challans Impact Summary */}
      <section className="surface-card rounded-[28px] p-5">
        <h3 className="text-lg font-bold text-neutral-900">Challan Impact on Insurance</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Each violation is classified under a Threat Hazard Zone (THZ). Higher THZ codes carry more
          points, causing greater score deductions and premium increases.
        </p>
      </section>

      {/* Active Violations */}
      {activeViolations.length > 0 ? (
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Active challans ({activeViolations.length})
          </p>
          {activeViolations.map((v) => (
            <ChallanCard key={v.id} violation={v} />
          ))}
        </section>
      ) : (
        <section className="surface-card rounded-[28px] p-8 text-center">
          <span className="text-4xl">🎉</span>
          <p className="mt-3 text-lg font-semibold text-neutral-900">No active challans!</p>
          <p className="mt-1 text-sm text-neutral-600">
            Your record is clean — keep driving safely.
          </p>
        </section>
      )}

      {/* Aged Out */}
      {agedOutViolations.length > 0 && (
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Aged out ({agedOutViolations.length})
          </p>
          {agedOutViolations.map((v) => (
            <ChallanCard key={v.id} violation={v} aged />
          ))}
        </section>
      )}
    </div>
  );
}

function ChallanCard({ violation, aged = false }) {
  const [expanded, setExpanded] = useState(false);
  const impactColor =
    violation.impactLevel === 'high'
      ? 'red'
      : violation.impactLevel === 'medium'
        ? 'amber'
        : 'green';

  return (
    <article
      className={`surface-card overflow-hidden rounded-[22px] transition-all ${aged ? 'opacity-60' : ''}`}
    >
      <button
        onClick={() => setExpanded((p) => !p)}
        className="flex w-full items-start justify-between gap-3 p-4 text-left"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-600">
              {violation.thzCode}
            </span>
            <h4 className="text-sm font-bold text-neutral-900">{violation.thzName}</h4>
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            {new Date(violation.date).toLocaleDateString('en-IN')} · {violation.location}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Badge color={impactColor}>{violation.scoreImpact} pts</Badge>
          <span className="text-[10px] text-neutral-400">{expanded ? 'Less' : 'More'}</span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-neutral-100 bg-neutral-50/50 px-4 py-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500">Challan</p>
              <p className="font-mono text-xs font-semibold text-neutral-900">
                {violation.challanNumber}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500">Fine</p>
              <p className="text-xs font-semibold text-neutral-900">₹{violation.amount}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500">Status</p>
              <Badge
                color={
                  violation.status === 'paid'
                    ? 'green'
                    : violation.status === 'expired'
                      ? 'grey'
                      : 'amber'
                }
              >
                {violation.status}
              </Badge>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500">THZ Points</p>
              <p className="text-xs font-semibold text-neutral-900">{violation.thzPoints} pts</p>
            </div>
          </div>
          {!aged && (
            <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2">
              <p className="text-xs leading-5 text-amber-800">
                <strong>Insurance impact:</strong> This {violation.thzName.toLowerCase()} violation
                contributed {Math.abs(violation.scoreImpact)} points to your score deduction,
                affecting your premium adjustment.
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

// ─── Premium Tab ──────────────────────────────────────────────────────

function PremiumTab({ currentScore, vehicle, basePremium, adjustedPremium, insurers = [] }) {
  return (
    <div className="space-y-4">
      {/* Insurer Renewal Offers */}
      {insurers.length > 0 && (
        <InsurerOffersSection insurers={insurers} adjustedPremium={adjustedPremium} />
      )}

      {/* Vehicle Classification */}
      <section className="surface-card rounded-[28px] p-5">
        <h3 className="text-lg font-bold text-neutral-900">Vehicle Classification</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Your base TP premium is calculated based on your vehicle type and engine capacity.
        </p>
        <div className="mt-4 space-y-3">
          <InfoRow label="Vehicle" value={`${vehicle?.make || ''} ${vehicle?.model || ''}`} />
          <InfoRow label="Type" value={vehicle?.type || '—'} />
          <InfoRow label="Engine" value={vehicle?.cc ? `${vehicle.cc} cc` : 'Electric'} />
          <InfoRow label="Base TP Premium" value={formatCurrency(basePremium)} />
        </div>
      </section>

      {/* TP Premium Slab */}
      {/* <section className="surface-card rounded-[28px] p-5">
        <h3 className="text-lg font-bold text-neutral-900">TP Premium Slabs</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Third-party premiums vary by vehicle type and engine capacity (cc).
        </p>

        Private Car
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Private Car
          </p>
          <div className="overflow-hidden rounded-xl border border-neutral-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                    Engine (cc)
                  </th>
                  <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {tpPremiumData.private_car.map((slab) => (
                  <tr key={slab.cc} className="border-t border-neutral-100">
                    <td className="px-3 py-2 font-medium text-neutral-700">{slab.cc}</td>
                    <td className="px-3 py-2 text-right font-semibold text-neutral-900">
                      {formatCurrency(slab.premium)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        Two Wheeler
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Two Wheeler
          </p>
          <div className="overflow-hidden rounded-xl border border-neutral-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                    Engine (cc)
                  </th>
                  <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {tpPremiumData.two_wheeler.map((slab) => (
                  <tr key={slab.cc} className="border-t border-neutral-100">
                    <td className="px-3 py-2 font-medium text-neutral-700">{slab.cc}</td>
                    <td className="px-3 py-2 text-right font-semibold text-neutral-900">
                      {formatCurrency(slab.premium)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        Goods Vehicle
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Goods Vehicle (by GVW)
          </p>
          <div className="overflow-hidden rounded-xl border border-neutral-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                    GVW (kg)
                  </th>
                  <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {tpPremiumData.goods_vehicle_gvw.map((slab) => (
                  <tr key={slab.gvw} className="border-t border-neutral-100">
                    <td className="px-3 py-2 font-medium text-neutral-700">{slab.gvw}</td>
                    <td className="px-3 py-2 text-right font-semibold text-neutral-900">
                      {formatCurrency(slab.premium)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section> */}

      {/* Premium Adjustment Table */}
      <section className="surface-card rounded-[28px] p-5">
        <h3 className="text-lg font-bold text-neutral-900">DBS Premium Adjustment Table</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Your premium adjustment depends on your DBS score band.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50">
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                  Score
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                  Band
                </th>
                <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                  Adjustment
                </th>
              </tr>
            </thead>
            <tbody>
              {premiumAdjustments.map((row) => {
                const isActive = currentScore >= row.min && currentScore <= row.max;
                return (
                  <tr
                    key={row.category}
                    className={`border-t border-neutral-100 transition-colors ${
                      isActive ? 'bg-brand-50 font-semibold' : ''
                    }`}
                  >
                    <td className="px-3 py-2.5 text-neutral-700">
                      {row.min}–{row.max}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="flex items-center gap-1.5">
                        {isActive && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                        <span className={isActive ? 'text-brand-700' : 'text-neutral-700'}>
                          {row.category}
                        </span>
                      </span>
                    </td>
                    <td
                      className={`px-3 py-2.5 text-right font-semibold ${
                        row.type === 'discount' ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {row.label}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Violation Model */}
      <section className="surface-card rounded-[28px] p-5">
        <h3 className="text-lg font-bold text-neutral-900">Violation Classification</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Violations are classified into Threat Hazard Zones (THZ). Higher-numbered points indicate
          more severe violations with greater premium impact.
        </p>
        <div className="mt-4 space-y-2">
          {violationModel.map((v) => (
            <div
              key={v.code}
              className="flex items-center justify-between rounded-xl border border-neutral-100 px-3 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold text-white ${
                    v.points >= 80
                      ? 'bg-red-500'
                      : v.points >= 50
                        ? 'bg-amber-500'
                        : v.points >= 30
                          ? 'bg-yellow-500'
                          : 'bg-neutral-400'
                  }`}
                >
                  {v.points}
                </span>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{v.name}</p>
                  <p className="text-[10px] text-neutral-500">{v.code}</p>
                </div>
              </div>
              <div
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  v.points >= 80
                    ? 'bg-red-50 text-red-700'
                    : v.points >= 50
                      ? 'bg-amber-50 text-amber-700'
                      : v.points >= 30
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-neutral-50 text-neutral-600'
                }`}
              >
                {v.points >= 80
                  ? 'Critical'
                  : v.points >= 50
                    ? 'High'
                    : v.points >= 30
                      ? 'Medium'
                      : 'Low'}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Insurer Offers Section ───────────────────────────────────────────

/**
 * Logo badge: uses a colored initials circle when no real logoUrl is provided.
 */
function InsurerLogoBadge({ name, logoUrl, brandColor }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className="h-12 w-12 rounded-2xl object-contain"
        style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', padding: '4px' }}
      />
    );
  }
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
  return (
    <div
      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold text-white"
      style={{
        background: brandColor || '#0058D1',
        boxShadow: `0 4px 14px ${brandColor ? brandColor + '55' : 'rgba(0,88,209,0.35)'}`,
        letterSpacing: '0.03em',
      }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}

function InsurerOfferCard({ insurer, adjustedPremium }) {
  const [browserOpen, setBrowserOpen] = useState(false);

  const displayPremium = insurer.premiumForCurrentDBS ?? adjustedPremium ?? insurer.tpPremium;

  return (
    <>
      <article
        className="surface-card overflow-hidden rounded-[24px] transition-all active:scale-[0.98]"
        style={{ border: insurer.dbsParticipating ? '1.5px solid rgba(0,88,209,0.18)' : undefined }}
      >
        <button
          id={`insurer-card-${insurer.id}`}
          onClick={() => setBrowserOpen(true)}
          className="flex w-full items-center gap-4 px-4 py-4 text-left"
          aria-label={`View ${insurer.name} quote`}
        >
          {/* Logo */}
          <InsurerLogoBadge
            name={insurer.name}
            logoUrl={insurer.logoUrl}
            brandColor={insurer.brandColor}
          />

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-sm font-bold text-neutral-900">{insurer.name}</p>
              {insurer.dbsParticipating && (
                <span
                  className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(0,88,209,0.1)', color: '#0058D1' }}
                >
                  🏅 DBS Partner
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="mt-0.5 flex items-center gap-1">
              <span className="text-[11px] text-amber-500">★</span>
              <span className="text-[11px] font-semibold text-neutral-600">{insurer.rating}</span>
              <span className="text-[11px] text-neutral-400">
                ({insurer.reviews?.toLocaleString()})
              </span>
            </div>

            {/* Feature chips */}
            {insurer.features?.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {insurer.features.slice(0, 2).map((f) => (
                  <span
                    key={f}
                    className="rounded-lg px-2 py-0.5 text-[9px] font-semibold text-neutral-600"
                    style={{ background: 'rgba(0,0,0,0.05)' }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price + CTA */}
          <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              TP / yr
            </p>
            <p className="text-lg font-extrabold text-brand-700">
              {formatCurrency(displayPremium)}
            </p>
            {insurer.discountPercent > 0 && (
              <span
                className="rounded-full px-2 py-0.5 text-[9px] font-bold"
                style={{ background: 'rgba(16,185,129,0.12)', color: '#059669' }}
              >
                −{insurer.discountPercent}% DBS
              </span>
            )}
            <span
              className="mt-0.5 rounded-xl px-3 py-1.5 text-[11px] font-bold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg,#273471,#0058D1 60%,#00D3FF)',
                boxShadow: '0 4px 12px rgba(0,88,209,0.3)',
              }}
            >
              Get Quote →
            </span>
          </div>
        </button>
      </article>

      <InAppBrowser
        url={insurer.quoteUrl}
        title={`${insurer.name} — Insurance Quote`}
        isOpen={browserOpen}
        onClose={() => setBrowserOpen(false)}
      />
    </>
  );
}

function InsurerOffersSection({ insurers, adjustedPremium }) {
  return (
    <section className="space-y-3">
      {/* Header */}
      <div
        className="relative overflow-hidden rounded-[24px] px-5 py-4 text-white"
        style={{
          background: 'linear-gradient(135deg,#273471 0%,#0058D1 55%,#00D3FF 100%)',
          boxShadow: '0 8px 30px rgba(0,88,209,0.28)',
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20"
          style={{ background: 'rgba(255,255,255,0.4)', filter: 'blur(16px)' }}
        />
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
          Premium Tab
        </p>
        <h3 className="mt-0.5 text-lg font-bold">Renewal Offers from Insurers</h3>
        <p className="mt-1 text-[12px] leading-relaxed text-white/75">
          Compare TP premiums from top insurers. DBS Partners offer exclusive discounts based on
          your driving score.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {insurers.map((insurer) => (
          <InsurerOfferCard key={insurer.id} insurer={insurer} adjustedPremium={adjustedPremium} />
        ))}
      </div>
    </section>
  );
}

// ─── Shared Utility Components ────────────────────────────────────────

function InfoRow({ label, value, children }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-neutral-500">{label}</span>
      <span className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
        {children}
        {value}
      </span>
    </div>
  );
}

function PremiumRow({ label, value, highlight = false, isDiscount = false, bold = false }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${
        highlight
          ? isDiscount
            ? 'bg-emerald-50'
            : 'bg-red-50'
          : bold
            ? 'bg-neutral-50'
            : 'bg-white'
      }`}
    >
      <span className={`text-sm ${bold ? 'font-bold text-neutral-900' : 'text-neutral-700'}`}>
        {label}
      </span>
      <span
        className={`text-sm font-semibold ${
          highlight
            ? isDiscount
              ? 'text-emerald-700'
              : 'text-red-700'
            : bold
              ? 'text-lg font-bold text-brand-700'
              : 'text-neutral-900'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
