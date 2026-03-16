import { useNavigate } from 'react-router-dom';
import BottomNav from '@components/BottomNav';
import ScoreGauge from '@components/ScoreGauge';
import ScoreStrip from '@components/ScoreStrip';
import VehicleChip from '@components/VehicleChip';
import ErrorState from '@components/ui/ErrorState';
import FullPageSpinner from '@components/ui/FullPageSpinner';
import Skeleton from '@components/ui/Skeleton';
import { useUI } from '@context/UIContext';
import { useUser } from '@context/UserContext';
import { useRewards } from '@hooks/useRewards';
import { useScore } from '@hooks/useScore';
import { getGreeting } from '@utils/formatters';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { score, loading: scoreLoading, error: scoreError, refetch } = useScore();
  const { rewards, loading: rewardsLoading, error: rewardsError } = useRewards(null, 1, 5);
  const { openModal } = useUI();

  if ((scoreLoading || rewardsLoading) && !score) return <FullPageSpinner />;
  if ((scoreError || rewardsError) && !score)
    return <ErrorState message={scoreError || rewardsError} onRetry={refetch} />;
  if (!user || !score) return <FullPageSpinner />;

  const unlockedRewards = rewards.filter((reward) => reward.isUnlocked);
  const nextUnlock = rewards
    .filter((reward) => !reward.isUnlocked)
    .sort((a, b) => a.pointsNeeded - b.pointsNeeded)[0];

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-screen-sm items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              TrafficRewards
            </p>
            <h1 className="font-display text-xl font-bold text-neutral-900">Driver dashboard</h1>
          </div>
          <button className="relative rounded-full bg-neutral-100 p-3" aria-label="Notifications">
            🔔
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-screen-sm space-y-6 px-4 py-6">
        <section>
          <p className="text-sm text-neutral-500">{getGreeting()}</p>
          <h2 className="mt-1 text-2xl font-bold text-neutral-900">{user.firstName} 👋</h2>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-blue-500 p-6 text-white shadow-lg">
          {scoreLoading ? (
            <Skeleton height="220px" rounded="xl" />
          ) : (
            <ScoreGauge score={score.current} />
          )}
        </section>

        <ScoreStrip score={score.current} percentile={score.percentile} />

        <VehicleChip
          vehicle={user.vehicles[0]}
          onTap={(vehicle) => openModal('vehicle-details', vehicle)}
        />

        <section className="grid grid-cols-2 gap-3">
          <StatCard label="Clean Days" value={score.stats.cleanDays} accent="text-green-600" />
          <StatCard
            label="Violations This Year"
            value={score.stats.violationsThisYear}
            accent="text-amber-600"
          />
          <StatCard
            label="Rewards Available"
            value={unlockedRewards.length}
            accent="text-brand-600"
          />
          <StatCard
            label="Points to Next Unlock"
            value={nextUnlock?.pointsNeeded ?? 0}
            accent="text-purple-600"
          />
        </section>

        <button
          onClick={() => navigate('/improve')}
          className="w-full rounded-3xl bg-gradient-to-r from-brand-700 to-blue-500 p-5 text-left text-white shadow-md"
        >
          <p className="text-sm opacity-80">Improve my score</p>
          <div className="mt-1 flex items-center justify-between">
            <h3 className="text-xl font-bold">See your next milestone</h3>
            <span className="text-2xl">🚀</span>
          </div>
        </button>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-neutral-900">Rewards preview</h3>
            <button
              onClick={() => navigate('/rewards')}
              className="text-sm font-semibold text-brand-700"
            >
              View all
            </button>
          </div>

          {rewardsLoading ? (
            <div className="space-y-3">
              <Skeleton height="72px" rounded="xl" />
              <Skeleton height="72px" rounded="xl" />
            </div>
          ) : (
            <div className="space-y-3">
              {rewards.slice(0, 4).map((reward) => (
                <button
                  key={reward.id}
                  onClick={() =>
                    openModal(reward.isUnlocked ? 'redeem-reward' : 'locked-reward', reward)
                  }
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${
                    reward.isUnlocked
                      ? 'border-brand-100 bg-brand-50'
                      : 'border-neutral-200 bg-neutral-50'
                  }`}
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      {reward.brand}
                    </p>
                    <p className="font-semibold text-neutral-900">{reward.offerTitle}</p>
                  </div>
                  <span className="text-sm font-semibold text-brand-700">
                    {reward.isUnlocked ? 'Redeem' : `+${reward.pointsNeeded} pts`}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${accent}`}>{value}</p>
    </article>
  );
}
