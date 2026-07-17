import PropTypes from 'prop-types';
import { getRewardFulfillmentLabel } from '@utils/rewardFulfillment';
import SafeRewardImage from './ui/SafeRewardImage';

export default function RewardCard({ reward, userScore = 0, onRedeemTap, onLockedTap }) {
  const progress = reward.isUnlocked ? 100 : Math.min((userScore / reward.minimumScore) * 100, 100);
  const isDevelopment =
    (typeof import.meta !== 'undefined' && import.meta.env?.DEV) ||
    (typeof globalThis.process !== 'undefined' &&
      globalThis.process?.env?.NODE_ENV === 'development');

  return (
    <article
      onClick={!reward.isUnlocked ? () => onLockedTap?.(reward) : undefined}
      className={`relative overflow-hidden rounded-[28px] border transition-all ${
        reward.isUnlocked
          ? 'border-brand-100 brand-gradient-soft shadow-[0_16px_30px_rgba(0,40,96,0.08)] hover:shadow-[0_18px_34px_rgba(0,40,96,0.12)]'
          : 'border-neutral-200 bg-neutral-100/60 shadow-sm grayscale-[75%] opacity-70 cursor-pointer select-none'
      }`}
    >
      {isDevelopment && Number.isFinite(reward.score) && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-neutral-200 px-2.5 py-1 text-[11px] font-semibold text-neutral-600 shadow-sm">
          {reward.score.toFixed(2)}
        </div>
      )}

      <div className="border-b border-neutral-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(238,246,255,0.92))] p-3">
        <div className="overflow-hidden rounded-[22px] bg-white">
          <SafeRewardImage
            src={reward.cardImageUrl || reward.bannerImage}
            alt={`${reward.brand} offer card`}
            brand={reward.brand}
            category={reward.category}
            className="h-auto w-full object-contain"
            containerClassName="w-full h-32 rounded-[20px]"
          />
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {reward.brandLogo && (
              <img
                src={reward.brandLogo}
                alt={`${reward.brand} logo`}
                className="h-9 w-9 rounded-full object-contain bg-white border border-neutral-100 p-0.5 flex-none"
              />
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500 flex items-center gap-1.5">
                {!reward.isUnlocked && <span className="text-neutral-400">🔒</span>}
                {reward.brand}
              </p>
              <h3 className="mt-1 text-xl font-bold leading-tight text-neutral-900">
                {reward.offerTitle}
              </h3>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 flex-none">
            <span className="rounded-full bg-neutral-950 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
              {reward.category}
            </span>
            {reward.rewardValue && (
              <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
                {reward.rewardValue}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm leading-6 text-neutral-600">
          {reward.offerCondition || reward.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <MetaBadge label={getRewardFulfillmentLabel(reward)} />
          <MetaBadge
            label={
              reward.couponType === 'Dynamic' || reward.couponMode === 'dynamic'
                ? 'Dynamic Coupon'
                : 'Static Coupon'
            }
          />
          <MetaBadge label={reward.nationalLocal || 'National'} />
          <MetaBadge label={reward.onlineOffline || 'Online'} />
          <MetaBadge label={`Max ${reward.maxUseLimit ?? 1} uses`} />
        </div>

        {!reward.isUnlocked ? (
          <div className="rounded-2xl bg-neutral-150 border border-neutral-300 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-600">
              <div className="flex items-center gap-1.5 text-neutral-800">
                <span className="text-sm">🔒</span>
                <span>
                  {reward.applicableRegistrationNumber ? 'Vehicle Offer' : 'Locked Reward'}
                </span>
              </div>
              <span className="text-brand-700 font-bold">
                {reward.minimumScore - userScore} points remaining to unlock
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
              <div className="h-full bg-brand-500 rounded-full" style={{ width: `${progress}%` }} />
            </div>

            <div className="flex justify-between text-[11px] font-medium text-neutral-500">
              <span>
                {reward.applicableRegistrationNumber ? (
                  <>
                    Score (
                    <span className="font-mono font-bold text-neutral-800">
                      {reward.applicableRegistrationNumber}
                    </span>
                    ):
                  </>
                ) : (
                  <>Current Score:</>
                )}{' '}
                <strong className="text-neutral-700 font-semibold">{userScore}</strong>
              </span>
              <span>
                Required Score:{' '}
                <strong className="text-neutral-700 font-semibold">{reward.minimumScore}</strong>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-1 text-xs text-emerald-700 font-semibold bg-emerald-50 w-fit px-2.5 py-1 rounded-full border border-emerald-100">
              <span>🔓</span>
              <span>Unlocked</span>
            </div>
            <span>Valid till {new Date(reward.expiresAt).toLocaleDateString('en-IN')}</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          {reward.isUnlocked && (
            <button
              onClick={() => onRedeemTap?.(reward)}
              className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
            >
              Redeem
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
    brandLogo: PropTypes.string,
    bannerImage: PropTypes.string,
    rewardValue: PropTypes.string,
    redemptionMethod: PropTypes.string,
    couponType: PropTypes.string,
    nationalLocal: PropTypes.string,
    onlineOffline: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  userScore: PropTypes.number,
  onRedeemTap: PropTypes.func,
  onLockedTap: PropTypes.func,
};
