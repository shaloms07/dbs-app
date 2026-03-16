import { useScore } from '@hooks/useScore';
import { useUser } from '@context/UserContext';
import ScoreGauge from '@components/ScoreGauge';
import Skeleton from '@components/ui/Skeleton';
import ErrorState from '@components/ui/ErrorState';

export default function HomeScreen() {
  const { user } = useUser();
  const { score, loading, error, refetch } = useScore();

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 p-4">
        <div className="space-y-4">
          <Skeleton height="60px" rounded="lg" />
          <Skeleton height="200px" rounded="lg" />
          <Skeleton height="100px" rounded="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between p-4 max-w-screen-sm mx-auto">
          <h1 className="text-xl font-bold text-brand-900">
            Traffic<span className="text-success">Rewards</span>
          </h1>
          <button className="relative p-2">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-sm mx-auto px-4 py-8 space-y-6">
        {/* Greeting */}
        <div>
          <p className="text-sm text-neutral-600">Good morning</p>
          <h2 className="text-2xl font-bold text-neutral-900">{user?.firstName} 👋</h2>
        </div>

        {/* Score Gauge */}
        {score && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <ScoreGauge score={score.current} animated={true} />
            <div className="text-center mt-4">
              <p className="text-sm text-neutral-600">{score.band} Driver</p>
              <p className="text-xs text-neutral-500">Top {score.percentile}%</p>
            </div>
          </div>
        )}

        {/* Vehicle Chip */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between border border-neutral-200">
          <div>
            <p className="text-xs text-neutral-600">Vehicle</p>
            <p className="font-mono font-bold text-neutral-900">
              {user?.vehicles?.[0]?.registrationNumber}
            </p>
          </div>
          <span className="text-lg">🚗</span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-success">{score?.stats?.cleanDays}</p>
            <p className="text-xs text-neutral-600 mt-1">Clean Days</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-warning">{score?.stats?.violationsThisYear}</p>
            <p className="text-xs text-neutral-600 mt-1">Violations</p>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-gradient-to-r from-brand-600 to-blue-600 text-white font-semibold py-3 rounded-lg">
          🚀 Improve My Score
        </button>
      </div>
    </div>
  );
}
