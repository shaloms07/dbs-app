import { useMemo } from 'react';

/**
 * InsuranceRenewalBanner
 * Shown on Home & Insurance (Overview) screens when policy is due for renewal.
 *
 * Props:
 *   expiryDate  – ISO date string, e.g. "2026-08-31"
 *   onViewOffers – callback when CTA is tapped
 */
export default function InsuranceRenewalBanner({ expiryDate, onViewOffers }) {
  const { label, daysLeft, isExpired, isUrgent } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
    const diff = Math.round((expiry - today) / (1000 * 60 * 60 * 24));

    const formattedDate = expiry.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return {
      label: formattedDate,
      daysLeft: diff,
      isExpired: diff < 0,
      isUrgent: diff >= 0 && diff <= 30,
    };
  }, [expiryDate]);

  const urgencyText = isExpired
    ? 'Policy Expired'
    : isUrgent
      ? `Expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`
      : 'Policy Renewing Soon';

  return (
    <section
      className="relative overflow-hidden rounded-[28px] p-5 text-white"
      style={{
        background: isExpired
          ? 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 60%, #f97316 100%)'
          : isUrgent
            ? 'linear-gradient(135deg, #92400e 0%, #d97706 55%, #fbbf24 100%)'
            : 'linear-gradient(135deg, #1e3a5f 0%, #d97706 60%, #f59e0b 100%)',
        boxShadow: '0 18px 46px rgba(0,40,96,0.14)',
        border: '1px solid rgba(255,255,255,0.25)',
      }}
    >
      {/* Decorative blobs */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-20"
        style={{ background: 'rgba(255,255,255,0.35)', filter: 'blur(18px)' }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 rounded-full opacity-15"
        style={{ background: 'rgba(255,255,255,0.3)', filter: 'blur(14px)' }}
      />

      <div className="relative flex items-start gap-4">
        {/* Icon */}
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl text-xl"
          style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
        >
          {isExpired ? '⚠️' : '🛡️'}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
            Insurance Renewal
          </p>
          <p className="mt-0.5 text-sm font-bold leading-snug text-white">
            {isExpired ? 'Your policy has expired!' : 'Your policy expires on'}
          </p>
          {!isExpired && (
            <p
              className="mt-0.5 text-base font-extrabold tracking-tight text-white"
              style={{
                animation: isUrgent ? 'pulse 2s ease-in-out infinite' : 'none',
              }}
            >
              {label}
            </p>
          )}
          <p className="mt-1 text-[11px] font-semibold text-white/75">{urgencyText}</p>
        </div>

        {/* CTA */}
        <button
          id="insurance-renewal-view-offers-btn"
          onClick={onViewOffers}
          className="flex-shrink-0 self-center rounded-2xl px-3 py-2 text-xs font-bold transition-transform active:scale-95"
          style={{
            background: 'rgba(255,255,255,0.22)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            whiteSpace: 'nowrap',
          }}
        >
          View Offers →
        </button>
      </div>
    </section>
  );
}
