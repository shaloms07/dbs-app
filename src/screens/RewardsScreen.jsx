import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@components/BottomNav';
import RewardCard from '@components/RewardCard';
import VehicleSwitcher from '@components/VehicleSwitcher';
import ErrorState from '@components/ui/ErrorState';
import FullPageSpinner from '@components/ui/FullPageSpinner';
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
  const { score } = useScore();
  const { rewards, loading, error, refetch } = useRewards(
    category === 'all' ? null : category,
    1,
    1000,
    user
  );
  const recommendationProfile = useMemo(
    () => buildRecommendationProfile(user, score, interactionProfile),
    [user, score, interactionProfile]
  );
  const recommendedRewards = useMemo(() => {
    // Personalised feed - ranked by expiry urgency first, then relevance, value, and likelihood
    return generateRecommendedFeed(
      mapOffersToRecommendationOffers(rewards),
      recommendationProfile,
      rewards.length
    );
  }, [recommendationProfile, rewards]);

  const nextUnlock = useMemo(
    () =>
      recommendedRewards
        .filter((reward) => !reward.isUnlocked)
        .sort((a, b) => a.minimumScore - b.minimumScore)[0],
    [recommendedRewards]
  );

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
                const couponCode = offer.redemptionValue || 'PROMO100';

                return (
                  <article
                    key={id}
                    className="surface-card overflow-hidden rounded-[24px] border border-white/70 brand-gradient-soft p-4"
                  >
                    <div className="flex gap-3">
                      {offer.cardImageUrl && (
                        <img
                          src={offer.cardImageUrl}
                          alt={offer.brand}
                          className="h-16 w-16 flex-none rounded-xl object-contain bg-white border border-neutral-100"
                        />
                      )}
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

        <section className="surface-card rounded-[30px] px-4 py-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Showing rewards for {user?.residenceCity || 'your city'}
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
        </section>

        <section className="grid gap-4">
          {recommendedRewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userScore={score?.current ?? 0}
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
          {recommendedRewards.length === 0 && (
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
