import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@components/BottomNav';
import RewardCard from '@components/RewardCard';
import ErrorState from '@components/ui/ErrorState';
import FullPageSpinner from '@components/ui/FullPageSpinner';
import { useUI } from '@context/UIContext';
import { useRewards } from '@hooks/useRewards';
import { useScore } from '@hooks/useScore';

const CATEGORIES = ['all', 'fuel', 'food', 'auto', 'travel', 'shopping'];

export default function RewardsScreen() {
  const navigate = useNavigate();
  const { openModal } = useUI();
  const [category, setCategory] = useState('all');
  const { score } = useScore();
  const { rewards, loading, error, refetch } = useRewards(category === 'all' ? null : category);

  const nextUnlock = useMemo(
    () =>
      rewards
        .filter((reward) => !reward.isUnlocked)
        .sort((a, b) => a.minimumScore - b.minimumScore)[0],
    [rewards]
  );

  if (loading && rewards.length === 0) return <FullPageSpinner />;
  if (error && rewards.length === 0) return <ErrorState message={error} onRetry={refetch} />;

  const unlocked = rewards.filter((reward) => reward.isUnlocked);
  const locked = rewards.filter((reward) => !reward.isUnlocked);

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-screen-sm items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate('/home')}
            className="rounded-full bg-neutral-100 p-2"
            aria-label="Back"
          >
            ←
          </button>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">My Rewards</h1>
            <p className="text-xs text-neutral-500">
              {unlocked.length} unlocked • {locked.length} locked
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-screen-sm space-y-6 px-4 py-6">
        <section className="rounded-3xl bg-gradient-to-r from-fuchsia-600 to-pink-500 p-6 text-white shadow-lg">
          <p className="text-sm opacity-80">Rewards unlocked by safer driving</p>
          <h2 className="mt-2 text-3xl font-bold">{unlocked.length} ready to redeem</h2>
          {nextUnlock && (
            <p className="mt-2 text-sm opacity-90">
              Reach {nextUnlock.minimumScore} to unlock more premium offers.
            </p>
          )}
        </section>

        <section className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-3 py-2 text-sm font-semibold capitalize ${
                  category === item ? 'bg-brand-600 text-white' : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userScore={score?.current ?? 0}
              onRedeemTap={(selected) => openModal('redeem-reward', selected)}
              onLockedTap={(selected) => openModal('locked-reward', selected)}
            />
          ))}
          {rewards.length === 0 && (
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <p className="text-lg font-semibold text-neutral-900">No rewards in this category</p>
              <p className="mt-2 text-sm text-neutral-500">
                Try another filter or improve your score to unlock more.
              </p>
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
