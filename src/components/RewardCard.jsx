import PropTypes from 'prop-types';

const CATEGORY_ICONS = {
  fuel: '⛽',
  food: '🍔',
  auto: '🚗',
  travel: '✈️',
  shopping: '🛍️',
  insurance: '🛡️',
};

export default function RewardCard({ reward, userScore = 0, onRedeemTap, onLockedTap }) {
  const icon = CATEGORY_ICONS[reward.category] ?? '🎁';
  const progress = reward.isUnlocked ? 100 : Math.min((userScore / reward.minimumScore) * 100, 100);

  return (
    <article
      className={`rounded-2xl border p-4 transition-all ${
        reward.isUnlocked
          ? 'border-brand-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,251,249,0.92))] shadow-[0_16px_30px_rgba(26,36,40,0.08)] hover:shadow-[0_18px_34px_rgba(26,36,40,0.12)]'
          : 'border-neutral-200 bg-[rgba(249,245,239,0.92)]'
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {reward.brand}
          </p>
          <h3
            className={`mt-1 text-base font-bold ${reward.isUnlocked ? 'text-brand-900' : 'text-neutral-700'}`}
          >
            {reward.offerTitle}
          </h3>
          <p className="mt-1 text-sm text-neutral-600">{reward.offerCondition}</p>
        </div>
        <span className="text-3xl" aria-hidden="true">
          {icon}
        </span>
      </div>

      <div className="mb-3 flex items-center justify-between text-xs text-neutral-500">
        <span className="rounded-full bg-white px-2 py-1 font-semibold capitalize text-neutral-700 shadow-sm">
          {reward.category}
        </span>
        <span>Min score {reward.minimumScore}</span>
      </div>

      {!reward.isUnlocked && (
        <div className="mb-3">
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

      <div className="flex items-center justify-between gap-3 text-xs text-neutral-500">
        <span>Valid till {new Date(reward.expiresAt).toLocaleDateString('en-IN')}</span>
        {reward.isUnlocked ? (
          <button
            onClick={() => onRedeemTap?.(reward)}
            className="rounded-lg bg-[linear-gradient(135deg,#132c32,#146d67)] px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-95"
          >
            Redeem
          </button>
        ) : (
          <button
            onClick={() => onLockedTap?.(reward)}
            className="rounded-lg bg-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-300"
          >
            Locked
          </button>
        )}
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
  }).isRequired,
  userScore: PropTypes.number,
  onRedeemTap: PropTypes.func,
  onLockedTap: PropTypes.func,
};
