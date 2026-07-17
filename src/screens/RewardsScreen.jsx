import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@components/BottomNav';
import RewardCard from '@components/RewardCard';
import VehicleSwitcher from '@components/VehicleSwitcher';
import ErrorState from '@components/ui/ErrorState';
import FullPageSpinner from '@components/ui/FullPageSpinner';
import SafeRewardImage from '@components/ui/SafeRewardImage';
import { useUI } from '@context/UIContext';
import { useUser } from '@context/UserContext';
import { useRewards } from '@hooks/useRewards';
import { useRewardInteractions } from '@hooks/useRewardInteractions';
import { useScore } from '@hooks/useScore';
import {
  buildRecommendationProfile,
  mapOffersToRecommendationOffers,
} from '@utils/recommendationAdapters';
import { generateRecommendedFeed } from '@utils/recommendationEngine';
import { mockRewards } from '@data/mockRewards';
import { getRewardFulfillmentSummary } from '@utils/rewardFulfillment';
import whiteLogo from '../media/Trafficrewards Logo-White.png';

const CATEGORIES = [
  'all',
  'travel',
  'food',
  'grocery',
  'electronics',
  'entertainment',
  'gifting',
  'fashion',
  'jewellery',
];

export default function RewardsScreen() {
  const navigate = useNavigate();
  const { openModal } = useUI();
  const { user } = useUser();
  const { interactionProfile, trackInteraction } = useRewardInteractions(user);
  const [category, setCategory] = useState('all');
  const [showHistory, setShowHistory] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'unlocked' | 'locked'
  const [sortOrder, setSortOrder] = useState('recommended'); // 'recommended' | 'easiest'
  const { score } = useScore();
  const { rewards, loading, error, refetch } = useRewards(
    category === 'all' ? null : category,
    1,
    1000,
    user
  );

  // Extract user-level score (average of all vehicles) for vehicle independence
  const userScore = useMemo(() => {
    if (score?.userScore !== undefined) return score.userScore;
    return score?.current ?? 0;
  }, [score]);

  // Dynamically calculate isUnlocked and pointsNeeded based on userScore or vehicle score
  const processedRewards = useMemo(() => {
    return (rewards ?? []).map((r) => {
      const regNum = r.applicableRegistrationNumber;
      let scoreUsed = userScore;
      let isVehicleSpecific = false;

      if (regNum) {
        const vehicleScore = score?.vehicleScores?.[regNum.trim().toUpperCase()];
        if (vehicleScore !== undefined) {
          scoreUsed = vehicleScore;
          isVehicleSpecific = true;
        }
      }

      const isUnlocked = scoreUsed >= r.minimumScore;
      const pointsNeeded = Math.max(0, r.minimumScore - scoreUsed);
      return {
        ...r,
        isUnlocked,
        pointsNeeded,
        isVehicleSpecific,
        vehicleScore: isVehicleSpecific ? scoreUsed : undefined,
      };
    });
  }, [rewards, userScore, score]);

  const recommendationProfile = useMemo(
    () => buildRecommendationProfile(user, { ...score, userScore }, interactionProfile),
    [user, score, userScore, interactionProfile]
  );

  const recommendedRewards = useMemo(() => {
    // Personalised feed - ranked by expiry urgency first, then relevance, value, and likelihood
    return generateRecommendedFeed(
      mapOffersToRecommendationOffers(processedRewards),
      recommendationProfile,
      processedRewards.length
    );
  }, [recommendationProfile, processedRewards]);

  const nextUnlock = useMemo(
    () =>
      recommendedRewards
        .filter((reward) => !reward.isUnlocked)
        .sort((a, b) => a.minimumScore - b.minimumScore)[0],
    [recommendedRewards]
  );

  // Apply status filter + sort on top of the recommendation-ranked list
  const displayedRewards = useMemo(() => {
    let filtered = recommendedRewards;

    if (statusFilter === 'unlocked') {
      filtered = filtered.filter((r) => r.isUnlocked);
    } else if (statusFilter === 'locked') {
      filtered = filtered.filter((r) => !r.isUnlocked);
    }

    if (sortOrder === 'easiest') {
      // Sort locked ones by fewest points remaining first, unlocked stay at top
      filtered = [...filtered].sort((a, b) => {
        if (a.isUnlocked && !b.isUnlocked) return -1;
        if (!a.isUnlocked && b.isUnlocked) return 1;
        return (a.pointsNeeded ?? 0) - (b.pointsNeeded ?? 0);
      });
    }

    return filtered;
  }, [recommendedRewards, statusFilter, sortOrder]);

  // Compute redemption history from interaction profile
  const redemptionHistory = useMemo(() => {
    if (!interactionProfile?.recentEvents) return [];
    const redeemEvents = interactionProfile.recentEvents.filter(
      (event) => event.action === 'redeem'
    );

    return redeemEvents
      .map((event) => {
        const offer = mockRewards.find((r) => r.id === event.offerId);
        return {
          id: event.timestamp + '-' + event.offerId,
          timestamp: event.timestamp,
          offer,
        };
      })
      .filter((item) => item.offer !== undefined);
  }, [interactionProfile]);

  const handleCopyCode = (code, id) => {
    if (!code) return;
    navigator.clipboard?.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => {
      setCopiedCodeId(null);
    }, 2000);
  };

  if (loading && rewards.length === 0) return <FullPageSpinner />;
  if (error && rewards.length === 0) return <ErrorState message={error} onRetry={refetch} />;

  const unlocked = recommendedRewards.filter((reward) => reward.isUnlocked);
  const locked = recommendedRewards.filter((reward) => !reward.isUnlocked);

  if (showHistory) {
    return (
      <div className="screen-wrap bg-transparent pb-28">
        <header className="sticky top-0 z-20 border-b border-white/70 bg-white/85 backdrop-blur-xl">
          <div className="screen-main px-4 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHistory(false)}
                className="rounded-2xl border border-white/70 bg-white/90 p-2.5 shadow-sm"
                aria-label="Back"
              >
                ←
              </button>
              <div>
                <h1 className="text-xl font-bold text-neutral-900">Redemption History</h1>
                <p className="text-xs text-neutral-600">
                  {redemptionHistory.length} offer{redemptionHistory.length !== 1 ? 's' : ''}{' '}
                  redeemed
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="screen-main space-y-4 px-4 py-5">
          {redemptionHistory.length > 0 ? (
            <div className="space-y-3">
              {redemptionHistory.map((item) => {
                const { offer, timestamp, id } = item;
                const isCopied = copiedCodeId === id;
                // Determine coupon code/redemption details
                const summary = getRewardFulfillmentSummary(offer, user);
                const couponCode = summary.couponValue || 'PROMO100';

                return (
                  <article
                    key={id}
                    className="surface-card overflow-hidden rounded-[24px] border border-white/70 brand-gradient-soft p-4"
                  >
                    <div className="flex gap-3">
                      <SafeRewardImage
                        src={offer.cardImageUrl || offer.bannerImage}
                        alt={offer.brand}
                        brand={offer.brand}
                        category={offer.category}
                        className="h-16 w-16 flex-none rounded-xl object-contain bg-white border border-neutral-100"
                        containerClassName="h-16 w-16 flex-none rounded-xl"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-600">
                            {offer.category}
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            {new Date(timestamp).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <h3 className="mt-1 font-bold text-neutral-900 leading-tight">
                          {offer.brand}
                        </h3>
                        <p className="text-xs text-neutral-600 mt-0.5">{offer.offerTitle}</p>
                      </div>
                    </div>

                    <div className="mt-3.5 flex items-center justify-between gap-3 rounded-xl bg-neutral-50 border border-neutral-100 p-2.5">
                      <div className="min-w-0">
                        <p className="text-[9px] uppercase tracking-wider font-semibold text-neutral-400">
                          Coupon Code
                        </p>
                        <code className="font-mono text-sm font-bold text-brand-700 truncate block">
                          {couponCode}
                        </code>
                      </div>
                      <button
                        onClick={() => handleCopyCode(couponCode, id)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                          isCopied
                            ? 'bg-emerald-500 text-white'
                            : 'bg-brand-600 text-white hover:bg-brand-700'
                        }`}
                      >
                        {isCopied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="surface-card rounded-[30px] p-8 text-center">
              <span className="text-4xl">🎁</span>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900">No redemptions yet</h3>
              <p className="mt-1 text-sm text-neutral-600">
                Browse through unlocked offers in the lounge and redeem them to see history here.
              </p>
              <button
                onClick={() => setShowHistory(false)}
                className="mt-4 rounded-full bg-brand-600 px-5 py-2 text-sm font-bold text-white shadow-md hover:bg-brand-700"
              >
                Go to Lounge
              </button>
            </div>
          )}
        </main>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="screen-wrap bg-transparent pb-28">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/85 backdrop-blur-xl">
        <div className="screen-main px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
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

            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-all"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>History</span>
            </button>
          </div>
          <div className="mt-3">
            <VehicleSwitcher />
          </div>
        </div>
      </header>

      <main className="screen-main space-y-5 px-4 py-5">
        <section className="surface-card-strong brand-gradient rounded-[32px] px-5 py-6 text-white">
          <img src={whiteLogo} alt="TrafficRewards" className="mb-4 h-auto w-36 opacity-95" />
          <p className="text-xs uppercase tracking-[0.24em] text-white/65">Rewards lounge</p>
          <h2 className="mt-2 text-3xl font-bold">{unlocked.length} offers ready for you</h2>
          {nextUnlock && (
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/82">
              Reach {nextUnlock.minimumScore} to unlock another wave of premium rewards.
            </p>
          )}
        </section>

        <section className="surface-card rounded-[30px] px-4 py-4 space-y-3">
          {/* Status toggle + sort row */}
          <div className="flex items-center justify-between gap-3">
            {/* 3-way status toggle */}
            <div className="flex items-center rounded-2xl bg-neutral-100 p-1 gap-0.5">
              {[
                { key: 'all', label: `All (${recommendedRewards.length})` },
                { key: 'unlocked', label: `🔓 ${unlocked.length}` },
                { key: 'locked', label: `🔒 ${locked.length}` },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setStatusFilter(key)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                    statusFilter === key
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Sort pill */}
            <button
              onClick={() => setSortOrder((s) => (s === 'recommended' ? 'easiest' : 'recommended'))}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                sortOrder === 'easiest'
                  ? 'border-brand-300 bg-brand-50 text-brand-700'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M6 12h12M9 17h6" />
              </svg>
              {sortOrder === 'easiest' ? 'Easiest first' : 'Recommended'}
            </button>
          </div>

          {/* Category chips */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Showing for {user?.residenceCity || 'your city'}
            </p>
            <div className="chip-scroll flex gap-2 overflow-x-auto">
              {CATEGORIES.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition-all ${
                    category === item
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Active filter summary strip */}
        {(statusFilter !== 'all' || sortOrder !== 'recommended') && (
          <div className="flex items-center justify-between rounded-2xl bg-brand-50 border border-brand-100 px-4 py-2.5">
            <p className="text-xs font-semibold text-brand-700">
              {statusFilter === 'unlocked' && `Showing ${displayedRewards.length} unlocked offers`}
              {statusFilter === 'locked' && `Showing ${displayedRewards.length} locked offers`}
              {statusFilter === 'all' && `${displayedRewards.length} offers`}
              {sortOrder === 'easiest' && ' · Sorted easiest to unlock first'}
            </p>
            <button
              onClick={() => {
                setStatusFilter('all');
                setSortOrder('recommended');
              }}
              className="text-xs font-bold text-brand-600 hover:text-brand-800 transition-colors"
            >
              Clear
            </button>
          </div>
        )}

        <section className="grid gap-4">
          {displayedRewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userScore={reward.isVehicleSpecific ? (reward.vehicleScore ?? 0) : userScore}
              onRedeemTap={(selected) => {
                void trackInteraction(selected, 'click');
                openModal(
                  selected.requiresConfirmation ? 'confirm-redeem-reward' : 'redeem-reward',
                  selected
                );
              }}
              onLockedTap={(selected) => {
                void trackInteraction(selected, 'click');
                openModal('locked-reward', selected);
              }}
            />
          ))}
          {displayedRewards.length === 0 && (
            <div className="surface-card rounded-[30px] p-8 text-center">
              <p className="text-4xl mb-3">
                {statusFilter === 'unlocked' ? '🎉' : statusFilter === 'locked' ? '🔒' : '🤔'}
              </p>
              <p className="text-lg font-semibold text-neutral-900">
                {statusFilter === 'unlocked'
                  ? 'No unlocked offers here yet'
                  : statusFilter === 'locked'
                    ? 'All offers in this category are unlocked!'
                    : 'No rewards in this category'}
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                {statusFilter === 'unlocked'
                  ? 'Improve your score to start unlocking offers.'
                  : statusFilter === 'locked'
                    ? 'Great work — keep driving safely!'
                    : 'Try another filter or improve your score to unlock more.'}
              </p>
              {statusFilter !== 'all' && (
                <button
                  onClick={() => setStatusFilter('all')}
                  className="mt-4 rounded-full bg-brand-600 px-5 py-2 text-sm font-bold text-white shadow-md hover:bg-brand-700"
                >
                  Show all offers
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
