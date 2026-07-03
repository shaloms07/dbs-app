import PropTypes from 'prop-types';
import { getRewardFulfillmentLabel } from '@utils/rewardFulfillment';

export default function RewardCard({ reward, userScore = 0, onRedeemTap, onLockedTap }) {
  const progress = reward.isUnlocked ? 100 : Math.min((userScore / reward.minimumScore) * 100, 100);
  const isDevelopment =
    (typeof import.meta !== 'undefined' && import.meta.env?.DEV) ||
    (typeof globalThis.process !== 'undefined' &&
      globalThis.process?.env?.NODE_ENV === 'development');

  return (
    <article
      className={`relative overflow-hidden rounded-[28px] border transition-all ${
        reward.isUnlocked
          ? 'border-brand-100 brand-gradient-soft shadow-[0_16px_30px_rgba(0,40,96,0.08)] hover:shadow-[0_18px_34px_rgba(0,40,96,0.12)]'
          : 'border-neutral-200 bg-neutral-50'
      }`}
    >
      {isDevelopment && Number.isFinite(reward.score) && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-neutral-200 px-2.5 py-1 text-[11px] font-semibold text-neutral-600 shadow-sm">
          {reward.score.toFixed(2)}
        </div>
      )}

      <div className="border-b border-neutral-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(238,246,255,0.92))] p-3">
        <div className="overflow-hidden rounded-[22px] bg-white">
          <img
            src={reward.cardImageUrl}
            alt={`${reward.brand} offer card`}
            className="h-auto w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              {reward.brand}
            </p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-neutral-900">
              {reward.offerTitle}
            </h3>
          </div>
          <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
            {reward.category}
          </span>
        </div>

        <p className="text-sm leading-6 text-neutral-600">{reward.offerCondition}</p>

        <div className="flex flex-wrap gap-2">
          <MetaBadge label={getRewardFulfillmentLabel(reward)} />
          <MetaBadge label={reward.couponMode === 'dynamic' ? 'Dynamic coupon' : 'Static coupon'} />
          <MetaBadge label={`Max ${reward.maxUseLimit ?? 1} uses`} />
          <MetaBadge
            label={reward.renewAfterDays ? `Renews in ${reward.renewAfterDays} days` : 'No renewal'}
          />
          {reward.requiresConfirmation && <MetaBadge label="Confirmation required" />}
          {reward.confirmationPinRequired && <MetaBadge label="PIN required" />}
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>Min score {reward.minimumScore}</span>
          <span>Valid till {new Date(reward.expiresAt).toLocaleDateString('en-IN')}</span>
        </div>

        {!reward.isUnlocked && (
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-neutral-500">Progress to unlock</span>
              <span className="font-semibold text-brand-700">{reward.pointsNeeded} pts to go</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full bg-[var(--gradient-primary)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          {reward.isUnlocked ? (
            <button
              onClick={() => onRedeemTap?.(reward)}
              className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
            >
              Redeem
            </button>
          ) : (
            <button
              onClick={() => onLockedTap?.(reward)}
              className="rounded-full border border-neutral-200 bg-neutral-100 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-all hover:bg-neutral-200 hover:text-neutral-900"
            >
              View details
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function MetaBadge({ label }) {
  return (
    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-600">
      {label}
    </span>
  );
}

RewardCard.propTypes = {
  reward: PropTypes.shape({
    id: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    offerTitle: PropTypes.string.isRequired,
    offerCondition: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    minimumScore: PropTypes.number.isRequired,
    isUnlocked: PropTypes.bool.isRequired,
    pointsNeeded: PropTypes.number.isRequired,
    expiresAt: PropTypes.string.isRequired,
    cardImageUrl: PropTypes.string.isRequired,
    score: PropTypes.number,
    fulfillmentType: PropTypes.string,
    couponMode: PropTypes.oneOf(['static', 'dynamic']),
    maxUseLimit: PropTypes.number,
    renewAfterDays: PropTypes.number,
    requiresConfirmation: PropTypes.bool,
    confirmationPinRequired: PropTypes.bool,
  }).isRequired,
  userScore: PropTypes.number,
  onRedeemTap: PropTypes.func,
  onLockedTap: PropTypes.func,
};
