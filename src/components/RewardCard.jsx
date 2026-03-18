import PropTypes from 'prop-types';

export default function RewardCard({ reward, userScore = 0, onRedeemTap, onLockedTap }) {
  const progress = reward.isUnlocked ? 100 : Math.min((userScore / reward.minimumScore) * 100, 100);

  return (
    <article
      className={`overflow-hidden rounded-[28px] border transition-all ${
        reward.isUnlocked
          ? 'border-brand-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,251,249,0.92))] shadow-[0_16px_30px_rgba(26,36,40,0.08)] hover:shadow-[0_18px_34px_rgba(26,36,40,0.12)]'
          : 'border-neutral-200 bg-[rgba(249,245,239,0.92)]'
      }`}
    >
      <div className="border-b border-neutral-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,238,231,0.92))] p-3">
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
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-700 shadow-sm">
            {reward.category}
          </span>
        </div>

        <p className="text-sm leading-6 text-neutral-600">{reward.offerCondition}</p>

        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>Min score {reward.minimumScore}</span>
          <span>Valid till {new Date(reward.expiresAt).toLocaleDateString('en-IN')}</span>
        </div>

        {!reward.isUnlocked && (
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-neutral-500">Progress to unlock</span>
              <span className="font-semibold text-amber-700">{reward.pointsNeeded} pts to go</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full bg-[linear-gradient(90deg,#d95d39,#e98647_45%,#1f8f80)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          {reward.isUnlocked ? (
            <button
              onClick={() => onRedeemTap?.(reward)}
              className="rounded-lg bg-[linear-gradient(135deg,#132c32,#146d67)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              Redeem
            </button>
          ) : (
            <button
              onClick={() => onLockedTap?.(reward)}
              className="rounded-lg bg-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-300"
            >
              View details
            </button>
          )}
        </div>
      </div>
    </article>
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
  }).isRequired,
  userScore: PropTypes.number,
  onRedeemTap: PropTypes.func,
  onLockedTap: PropTypes.func,
};
