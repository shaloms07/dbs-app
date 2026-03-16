import { useNavigate } from 'react-router-dom';
import Badge from '@components/ui/Badge';
import BottomNav from '@components/BottomNav';
import TrendChart from '@components/TrendChart';
import ViolationItem from '@components/ViolationItem';
import ErrorState from '@components/ui/ErrorState';
import FullPageSpinner from '@components/ui/FullPageSpinner';
import { useUI } from '@context/UIContext';
import { useUser } from '@context/UserContext';
import { useScore } from '@hooks/useScore';
import { useViolations } from '@hooks/useViolations';

export default function ScoreBreakdownScreen() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openModal } = useUI();
  const { score, loading: scoreLoading, error: scoreError, refetch } = useScore();
  const { violations, loading: violationsLoading, error: violationsError } = useViolations();

  if ((scoreLoading || violationsLoading) && !score) return <FullPageSpinner />;
  if ((scoreError || violationsError) && !score) {
    return <ErrorState message={scoreError || violationsError} onRetry={refetch} />;
  }
  if (!score || !user) return <FullPageSpinner />;

  const activeViolations = violations.filter((violation) => !violation.isAgedOut);
  const agedOutViolations = violations.filter((violation) => violation.isAgedOut);

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
            <h1 className="text-xl font-bold text-neutral-900">Score Breakdown</h1>
            <p className="text-xs text-neutral-500">{user.vehicles[0]?.registrationNumber}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-screen-sm space-y-6 px-4 py-6">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-neutral-500">Current DBS score</p>
              <h2 className="mt-1 text-5xl font-bold text-brand-700">{score.current}</h2>
            </div>
            <Badge color="blue">{score.band}</Badge>
          </div>
          <p className="mt-3 text-sm text-neutral-600">
            Your score is based on violations in the last 12 months.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-neutral-900">6-month trend</h3>
          <TrendChart data={score.history} activeMonth={score.history.at(-1)?.month} />
        </section>

        <section className="rounded-3xl bg-brand-50 p-5">
          <h3 className="text-lg font-bold text-brand-900">Score recovery simulator</h3>
          <div className="mt-4 space-y-3">
            {score.simulator.projections.map((projection) => (
              <div
                key={projection.daysFromNow}
                className="flex items-center justify-between rounded-2xl bg-white p-4"
              >
                <div>
                  <p className="font-semibold text-neutral-900">{projection.scenario}</p>
                  <p className="text-sm text-neutral-500">{projection.daysFromNow} days</p>
                </div>
                <p className="font-bold text-green-600">+{projection.scoreGain} pts</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white shadow-sm">
          <div className="border-b border-neutral-200 p-5">
            <h3 className="text-lg font-bold text-neutral-900">Active violations</h3>
            <p className="text-sm text-neutral-500">
              {activeViolations.length} currently affecting your score
            </p>
          </div>
          <div className="divide-y divide-neutral-200">
            {activeViolations.map((violation) => (
              <ViolationItem
                key={violation.id}
                violation={violation}
                onDisputeTap={(selected) => openModal('dispute-challan', selected)}
              />
            ))}
          </div>
        </section>

        {agedOutViolations.length > 0 && (
          <section className="rounded-3xl bg-white shadow-sm">
            <div className="border-b border-neutral-200 p-5">
              <h3 className="text-lg font-bold text-neutral-900">Aged-out violations</h3>
              <p className="text-sm text-neutral-500">No longer affecting your score</p>
            </div>
            <div className="divide-y divide-neutral-200">
              {agedOutViolations.map((violation) => (
                <ViolationItem key={violation.id} violation={violation} />
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
