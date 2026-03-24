import { useNavigate } from 'react-router-dom';
import BottomNav from '@components/BottomNav';
import TipCard from '@components/TipCard';
import VehicleSwitcher from '@components/VehicleSwitcher';
import ProgressBar from '@components/ui/ProgressBar';
import FullPageSpinner from '@components/ui/FullPageSpinner';
import { getTipsForVehicle } from '@data/tips';
import { useUser } from '@context/UserContext';
import { useScore } from '@hooks/useScore';

export default function ImproveScoreScreen() {
  const navigate = useNavigate();
  const { activeVehicle } = useUser();
  const { score, loading } = useScore();

  if (loading && !score) return <FullPageSpinner />;
  if (!score) return <FullPageSpinner />;

  const goalProgress = Math.min((score.current / score.target) * 100, 100);
  const safetyTips = getTipsForVehicle(activeVehicle?.type);

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-screen-sm px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/home')}
                className="rounded-full bg-neutral-100 p-2"
                aria-label="Back"
              >
                ←
              </button>
              <h1 className="text-xl font-bold text-neutral-900">Improve My Score</h1>
            </div>
            <VehicleSwitcher compact />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-screen-sm space-y-6 px-4 py-6">
        <section className="rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 p-6 text-white shadow-lg">
          <p className="text-sm opacity-80">Current score</p>
          <h2 className="mt-1 text-5xl font-bold">
            {score.current}
            <span className="ml-2 text-xl font-semibold text-white/70">/ {score.max}</span>
          </h2>
          <p className="mt-2 text-sm">
            Keep clean driving streaks to reach {score.target}+ faster.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <article className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm text-neutral-500">Current streak</p>
            <p className="mt-2 text-3xl font-bold text-orange-500">
              {score.stats.streak.currentDays}
            </p>
            <p className="text-sm text-neutral-600">days</p>
          </article>
          <article className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm text-neutral-500">Personal best</p>
            <p className="mt-2 text-3xl font-bold text-brand-700">{score.stats.streak.bestDays}</p>
            <p className="text-sm text-neutral-600">days</p>
          </article>
        </section>

        <section className="rounded-3xl bg-brand-900 p-5 text-white shadow-md">
          <p className="text-sm opacity-80">Next milestone</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-4xl font-bold">{score.nextMilestone.daysUntilExpiry}</h3>
              <p className="mt-1 text-sm opacity-80">
                days until {score.nextMilestone.violationType} ages out
              </p>
            </div>
            <p className="text-2xl font-bold text-emerald-300">
              +{score.nextMilestone.scoreGainOnExpiry}
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-neutral-900">Goal progress</h3>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              On Track
            </span>
          </div>
          <ProgressBar value={goalProgress} color="#0284c7" height={10} />
          <div className="mt-2 flex justify-between text-sm text-neutral-500">
            <span>{score.current}</span>
            <span>{score.target}</span>
          </div>
        </section>

        <section className="space-y-3">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Safety tips</h3>
            <p className="text-sm text-neutral-500">
              Small habit changes for your {activeVehicle?.type?.toLowerCase() ?? 'vehicle'} can
              move your score steadily upward.
            </p>
          </div>
          {safetyTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
