import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@components/BottomNav';
import ScoreGauge from '@components/ScoreGauge';
import ScoreStrip from '@components/ScoreStrip';
import VehicleChip from '@components/VehicleChip';
import VehicleSwitcher from '@components/VehicleSwitcher';
import ErrorState from '@components/ui/ErrorState';
import FullPageSpinner from '@components/ui/FullPageSpinner';
import Skeleton from '@components/ui/Skeleton';
import { useUI } from '@context/UIContext';
import { useUser } from '@context/UserContext';
import { useRewards } from '@hooks/useRewards';
import { useRewardInteractions } from '@hooks/useRewardInteractions';
import { useScore } from '@hooks/useScore';
import { useInsurance } from '@hooks/useInsurance';
import { getGreeting } from '@utils/formatters';
import InsuranceRenewalBanner from '@components/InsuranceRenewalBanner';
import mainLogo from '../media/Trafficrewards Logo-Main.png';
import whiteLogo from '../media/Trafficrewards Logo-White.png';
import {
  buildRecommendationProfile,
  mapOffersToRecommendationOffers,
} from '@utils/recommendationAdapters';
import { generateRecommendedFeed } from '@utils/recommendationEngine';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { user, activeVehicle } = useUser();
  const { score, loading: scoreLoading, error: scoreError, refetch } = useScore();
  const { rewards, loading: rewardsLoading, error: rewardsError } = useRewards(null, 1, 5, user);
  const { insurance } = useInsurance();
  const { openModal } = useUI();
  const { interactionProfile, trackInteraction } = useRewardInteractions(user);
  const recommendationProfile = useMemo(
    () => buildRecommendationProfile(user, score, interactionProfile),
    [user, score, interactionProfile]
  );
  const recommendedRewards = useMemo(() => {
    // Personalised feed — ranked by relevance, urgency, value, and completion likelihood
    return generateRecommendedFeed(
      mapOffersToRecommendationOffers(rewards),
      recommendationProfile,
      4
    );
  }, [recommendationProfile, rewards]);

  if ((scoreLoading || rewardsLoading) && !score) return <FullPageSpinner />;
  if ((scoreError || rewardsError) && !score) {
    return <ErrorState message={scoreError || rewardsError} onRetry={refetch} />;
  }
  if (!user || !score) return <FullPageSpinner />;

  const unlockedRewards = recommendedRewards.filter((reward) => reward.isUnlocked);
  const nextUnlock = recommendedRewards
    .filter((reward) => !reward.isUnlocked)
    .sort((a, b) => a.pointsNeeded - b.pointsNeeded)[0];

  return (
    <div className="screen-wrap bg-transparent pb-28">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/85 backdrop-blur-xl">
        <div className="screen-main flex items-center justify-between px-4 py-4">
          <div>
            <img src={mainLogo} alt="TrafficRewards" className="h-auto w-40" />
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
          <div className="mt-4">
            <VehicleSwitcher />
          </div>
        </section>

        <section className="surface-card-strong brand-gradient rounded-[34px] px-4 pb-5 pt-6 text-white">
          <img
            src={whiteLogo}
            alt="TrafficRewards"
            className="mx-auto mb-2 h-auto w-36 opacity-95"
          />
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
          <div className="mt-2 rounded-[24px] border border-white/20 bg-white/10 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">Snapshot</p>
            <p className="mt-1 text-sm leading-6 text-white/90">
              Clean for {score.stats.cleanDays} days and {nextUnlock?.pointsNeeded ?? 0} points away
              from your next unlock.
            </p>
          </div>
        </section>

        <ScoreStrip score={score.current} percentile={score.percentile} />

        <VehicleChip
          vehicle={activeVehicle}
          onTap={(vehicle) => openModal('vehicle-details', vehicle)}
        />

        {/* Insurance Renewal Banner */}
        {insurance?.policy?.expiryDate && (
          <InsuranceRenewalBanner
            expiryDate={insurance.policy.expiryDate}
            onViewOffers={() => navigate('/insurance')}
          />
        )}

        <section className="grid grid-cols-2 gap-3">
          <StatCard label="Clean Days" value={score.stats.cleanDays} accent="text-brand-700" />
          <StatCard
            label="Challans Last 12 Months"
            value={score.stats.violationsLast12Months}
            accent="text-cyan-600"
          />
          <StatCard
            label="Rewards Available"
            value={unlockedRewards.length}
            accent="text-sky-700"
          />
          <StatCard
            label="Points to Next Unlock"
            value={nextUnlock?.pointsNeeded ?? 0}
            accent="text-brand-900"
          />
        </section>

        <button
          onClick={() => navigate('/improve')}
          className="surface-card-strong w-full rounded-[30px] bg-[linear-gradient(135deg,#273471,#0058D1_60%,#00D3FF)] p-5 text-left text-white"
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
            <div className="grid grid-cols-2 gap-3">
              {recommendedRewards.map((reward) => (
                <button
                  key={reward.id}
                  onClick={() => {
                    void trackInteraction(reward, 'click');
                    openModal(
                      reward.isUnlocked
                        ? reward.requiresConfirmation
                          ? 'confirm-redeem-reward'
                          : 'redeem-reward'
                        : 'locked-reward',
                      reward
                    );
                  }}
                  className={`overflow-hidden rounded-[24px] border transition-all ${
                    reward.isUnlocked
                      ? 'border-brand-100 brand-gradient-soft shadow-sm'
                      : 'border-neutral-200 bg-neutral-50'
                  }`}
                  aria-label={`${reward.brand} reward`}
                >
                  <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(238,246,255,0.92))] p-2">
                    <img
                      src={reward.cardImageUrl}
                      alt={`${reward.brand} offer`}
                      className="h-auto w-full rounded-[18px] object-contain"
                      loading="lazy"
                    />
                  </div>
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
    <article className="surface-card rounded-[26px] border border-white/70 brand-gradient-soft p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">{label}</p>
      <p className={`mt-3 text-3xl font-bold ${accent}`}>{value}</p>
    </article>
  );
}
