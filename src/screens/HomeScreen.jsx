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
  if ((scoreError || rewardsError) && !score) {
    return <ErrorState message={scoreError || rewardsError} onRetry={refetch} />;
  }
  if (!user || !score) return <FullPageSpinner />;

  const unlockedRewards = rewards.filter((reward) => reward.isUnlocked);
  const nextUnlock = rewards
    .filter((reward) => !reward.isUnlocked)
    .sort((a, b) => a.pointsNeeded - b.pointsNeeded)[0];

  return (
    <div className="screen-wrap bg-transparent pb-28">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-[rgba(252,247,241,0.82)] backdrop-blur-xl">
        <div className="screen-main flex items-center justify-between px-4 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-600">
              TrafficRewards
            </p>
            <h1 className="font-display text-xl font-bold text-neutral-900">Driver dashboard</h1>
          </div>
          <button
            className="relative rounded-2xl border border-white/70 bg-white/90 p-3 shadow-sm"
            aria-label="Notifications"
          >
            🔔
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500" />
          </button>
        </div>
      </header>

      <main className="screen-main space-y-5 px-4 py-5">
        <section className="surface-card rounded-[30px] px-5 py-5">
          <p className="text-sm font-medium text-neutral-500">{getGreeting()}</p>
          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                {user.firstName} 👋
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                Your driving snapshot is looking steady today.
              </p>
            </div>
            <div className="hidden rounded-2xl border border-brand-100 bg-brand-50/70 px-4 py-3 text-right shadow-sm sm:block">
              <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                Current band
              </p>
              <p className="mt-1 text-lg font-bold text-brand-700">{score.band}</p>
            </div>
          </div>
        </section>

        <section className="surface-card-strong rounded-[34px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_36%),linear-gradient(165deg,#10252b,#135852_48%,#1f8f80_72%,#d8c27b)] px-4 pb-5 pt-6 text-white">
          {scoreLoading ? (
            <Skeleton height="260px" rounded="xl" />
          ) : (
            <>
              <ScoreGauge score={score.current} showValue={false} />
              <div className="-mt-2 text-center">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/65">
                  Current DBS score
                </p>
                <div className="mt-2 flex items-end justify-center gap-2">
                  <span className="text-5xl font-black leading-none text-white">
                    {score.current}
                  </span>
                  <span className="pb-1 text-lg font-semibold text-white/70">/ {score.max}</span>
                </div>
                {/* <p className="mt-2 text-sm font-medium text-white/82">
                  Previous 900-point score: {score.legacyScore ?? 742}
                </p> */}
              </div>
            </>
          )}
          <div className="mt-2 rounded-[24px] border border-white/20 bg-[rgba(11,29,34,0.18)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">Snapshot</p>
            <p className="mt-1 text-sm leading-6 text-white/90">
              Clean for {score.stats.cleanDays} days and {nextUnlock?.pointsNeeded ?? 0} points away
              from your next unlock.
            </p>
          </div>
        </section>

        <ScoreStrip score={score.current} percentile={score.percentile} />

        <VehicleChip
          vehicle={user.vehicles[0]}
          onTap={(vehicle) => openModal('vehicle-details', vehicle)}
        />

        <section className="grid grid-cols-2 gap-3">
          <StatCard label="Clean Days" value={score.stats.cleanDays} accent="text-emerald-700" />
          <StatCard
            label="Challans Last 12 Months"
            value={score.stats.violationsLast12Months}
            accent="text-amber-600"
          />
          <StatCard
            label="Rewards Available"
            value={unlockedRewards.length}
            accent="text-sky-700"
          />
          <StatCard
            label="Points to Next Unlock"
            value={nextUnlock?.pointsNeeded ?? 0}
            accent="text-orange-700"
          />
        </section>

        <button
          onClick={() => navigate('/improve')}
          className="surface-card-strong w-full rounded-[30px] bg-[linear-gradient(135deg,#172126,#135852_58%,#e98647)] p-5 text-left text-white"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-white/70">Improve my score</p>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Push toward your next milestone</h3>
              <p className="mt-1 text-sm text-white/80">
                Unlock more benefits with cleaner weekly driving.
              </p>
            </div>
            <span className="text-2xl">🚀</span>
          </div>
        </button>

        <section className="surface-card rounded-[30px] px-5 py-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">Rewards preview</h3>
              <p className="text-sm text-neutral-600">Quick access to the best unlocked offers.</p>
            </div>
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
                  className={`flex w-full items-center justify-between rounded-[24px] border px-4 py-3 text-left transition-all ${
                    reward.isUnlocked
                      ? 'border-brand-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,251,249,0.92))] shadow-sm'
                      : 'border-neutral-200 bg-[rgba(249,245,239,0.92)]'
                  }`}
                >
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                      {reward.brand}
                    </p>
                    <p className="mt-1 font-semibold text-neutral-900">{reward.offerTitle}</p>
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
    <article className="surface-card rounded-[26px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,242,235,0.92))] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">{label}</p>
      <p className={`mt-3 text-3xl font-bold ${accent}`}>{value}</p>
    </article>
  );
}
