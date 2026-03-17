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
    <div className="screen-wrap bg-transparent pb-28">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-[rgba(252,247,241,0.82)] backdrop-blur-xl">
        <div className="screen-main flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate('/home')}
            className="rounded-2xl border border-white/70 bg-white/90 p-2.5 shadow-sm"
            aria-label="Back"
          >
            ←
          </button>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">My Rewards</h1>
            <p className="text-xs text-neutral-600">
              {unlocked.length} unlocked • {locked.length} locked
            </p>
          </div>
        </div>
      </header>

      <main className="screen-main space-y-5 px-4 py-5">
        <section className="surface-card-strong rounded-[32px] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_34%),linear-gradient(145deg,#10252b,#146d67_54%,#e98647)] px-5 py-6 text-white">
          <p className="text-xs uppercase tracking-[0.24em] text-white/65">Rewards lounge</p>
          <h2 className="mt-2 text-3xl font-bold">{unlocked.length} offers ready for you</h2>
          {nextUnlock && (
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/82">
              Reach {nextUnlock.minimumScore} to unlock another wave of premium rewards.
            </p>
          )}
        </section>

        <section className="surface-card rounded-[30px] px-4 py-4">
          <div className="chip-scroll flex gap-2 overflow-x-auto">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition-all ${
                  category === item
                    ? 'bg-[linear-gradient(135deg,#132c32,#146d67)] text-white shadow-sm'
                    : 'bg-[rgba(247,241,233,0.92)] text-neutral-700 hover:bg-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-4">
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
            <div className="surface-card rounded-[30px] p-8 text-center">
              <p className="text-lg font-semibold text-neutral-900">No rewards in this category</p>
              <p className="mt-2 text-sm text-neutral-600">
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
