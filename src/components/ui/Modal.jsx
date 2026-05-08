import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useUI } from '@context/UIContext';
import { useUser } from '@context/UserContext';
import { useRewardInteractions } from '@hooks/useRewardInteractions';
import { useScore } from '@hooks/useScore';
import { getRewardFulfillmentSummary } from '@utils/rewardFulfillment';
import ProgressBar from './ProgressBar';

export default function Modal() {
  const { activeModal, closeModal, modalData } = useUI();
  const backdropRef = useRef(null);
  const isCenteredPopup = activeModal === 'confirm-redeem-reward';

  useEffect(() => {
    if (!activeModal) return undefined;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  if (!activeModal) return null;

  return createPortal(
    <div
      ref={backdropRef}
      onClick={(event) => {
        if (event.target === backdropRef.current) closeModal();
      }}
      className={`fixed inset-0 z-[999] ${
        isCenteredPopup
          ? 'bg-[rgba(15,23,42,0.82)] backdrop-blur-[3px]'
          : 'bg-black/55 backdrop-blur-[2px]'
      }`}
    >
      <div
        className={`fixed z-[1000] overflow-y-auto ${
          isCenteredPopup
            ? 'inset-0 flex items-center justify-center p-4 pointer-events-none'
            : 'bottom-0 left-0 right-0 mx-auto max-h-[88vh] max-w-screen-sm rounded-t-3xl'
        }`}
      >
        <div
          className={`relative bg-white shadow-2xl ${
            isCenteredPopup ? 'pointer-events-auto w-full max-w-md rounded-[32px] p-6' : 'p-6 pb-32'
          }`}
        >
          <div className="mb-4 flex justify-center">
            {!isCenteredPopup && <div className="h-1.5 w-12 rounded-full bg-neutral-300" />}
          </div>
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-full p-2 text-neutral-600 hover:bg-neutral-100"
            aria-label="Close modal"
          >
            ×
          </button>
          {renderModalContent(activeModal, modalData)}
        </div>
      </div>
    </div>,
    document.body
  );
}

function renderModalContent(name, data) {
  if (name === 'vehicle-details') return <VehicleDetailsModal vehicle={data} />;
  if (name === 'dispute-challan') return <DisputeChallanModal challan={data} />;
  if (name === 'confirm-redeem-reward') return <ConfirmRedeemModal reward={data} />;
  if (name === 'redeem-reward') return <RedeemRewardModal reward={data} />;
  if (name === 'locked-reward') return <LockedRewardModal reward={data} />;
  return <div className="text-sm text-neutral-600">Unknown modal</div>;
}

function ModalHeader({ eyebrow, title, description }) {
  return (
    <div className="space-y-2">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
      {description && <p className="text-sm leading-6 text-neutral-600">{description}</p>}
    </div>
  );
}

function VehicleDetailsModal({ vehicle }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-neutral-900">Vehicle Details</h2>
      <div className="space-y-3 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
        <div className="flex justify-between">
          <span>Registration</span>
          <span className="font-semibold">{vehicle.registrationNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Type</span>
          <span>{vehicle.type}</span>
        </div>
        <div className="flex justify-between">
          <span>Model</span>
          <span>
            {vehicle.make} {vehicle.model}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Fuel</span>
          <span>{vehicle.fuelType}</span>
        </div>
        <div className="flex justify-between">
          <span>Insurance expiry</span>
          <span>{new Date(vehicle.insuranceExpiry).toLocaleDateString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}

function DisputeChallanModal({ challan }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-neutral-900">Dispute Challan</h2>
      <p className="text-sm text-neutral-600">
        For MVP this is a placeholder flow for challan{' '}
        <span className="font-mono">{challan?.challanNumber}</span>.
      </p>
      <textarea
        rows="4"
        className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
        placeholder="Explain why this challan looks incorrect..."
      />
      <button className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white">
        Submit dispute
      </button>
    </div>
  );
}

function RedeemRewardModal({ reward }) {
  const { user } = useUser();
  const summary = getRewardFulfillmentSummary(reward, user);
  const code = summary.couponValue;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4 rounded-[24px] bg-[rgba(248,243,236,0.72)] p-3">
        <img
          src={reward?.cardImageUrl}
          alt={`${reward?.brand} offer`}
          className="h-24 w-24 flex-none rounded-[18px] bg-white object-contain"
        />
        <div className="min-w-0 pt-1">
          <h2 className="text-2xl font-bold text-neutral-900">{reward?.brand}</h2>
          <p className="mt-1 text-sm leading-6 text-neutral-600">{reward?.offerTitle}</p>
        </div>
      </div>
      <FulfillmentPanel reward={reward} summary={summary} code={code} />
    </div>
  );
}

function ConfirmRedeemModal({ reward }) {
  const { openModal, closeModal } = useUI();
  const { user } = useUser();
  const { trackInteraction } = useRewardInteractions(user);
  const summary = getRewardFulfillmentSummary(reward, user);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    if (summary.confirmationPinRequired && pin.trim() !== summary.confirmationPin) {
      setError('Enter the correct confirmation PIN to continue.');
      return;
    }

    await trackInteraction(reward, 'redeem');
    closeModal();
    openModal('redeem-reward', reward);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4 rounded-[24px] bg-[rgba(248,243,236,0.72)] p-3">
        <img
          src={reward?.cardImageUrl}
          alt={`${reward?.brand} offer`}
          className="h-24 w-24 flex-none rounded-[18px] bg-white object-contain"
        />
        <div className="min-w-0 pt-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            Confirm redeem
          </p>
          <h2 className="mt-1 text-2xl font-bold text-neutral-900">{reward?.brand}</h2>
          <p className="mt-1 text-sm leading-6 text-neutral-600">{reward?.offerTitle}</p>
        </div>
      </div>

      <ModalHeader
        eyebrow="Are you sure?"
        title="Redeem this reward now?"
        description="Once you confirm, we’ll reveal the redemption details for this offer."
      />

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center justify-between text-sm text-neutral-700">
          <span>Category</span>
          <span className="font-semibold capitalize">{reward?.category}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-neutral-700">
          <span>Valid till</span>
          <span className="font-semibold">
            {reward?.expiresAt ? new Date(reward.expiresAt).toLocaleDateString('en-IN') : '-'}
          </span>
        </div>
        {summary.confirmationPinRequired && (
          <div className="mt-3 rounded-xl border border-amber-200 bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
              Confirmation PIN
            </p>
            <input
              value={pin}
              onChange={(event) => {
                setPin(event.target.value);
                setError('');
              }}
              placeholder="Enter PIN"
              className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
            />
            <p className="mt-2 text-xs text-neutral-500">
              PIN required before this reward can be revealed.
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={closeModal}
          className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="rounded-2xl bg-[linear-gradient(135deg,#132c32,#146d67)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
        >
          Confirm redeem
        </button>
      </div>
    </div>
  );
}

function LockedRewardModal({ reward }) {
  const { score } = useScore();
  const currentScore = score?.current ?? 0;
  const progress = Math.min((currentScore / reward.minimumScore) * 100, 100);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4 rounded-[24px] bg-[rgba(248,243,236,0.72)] p-3">
        <img
          src={reward?.cardImageUrl}
          alt={`${reward?.brand} offer`}
          className="h-24 w-24 flex-none rounded-[18px] bg-white object-contain"
        />
        <div className="min-w-0 pt-1">
          <h2 className="text-2xl font-bold text-neutral-900">This reward is locked</h2>
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            You need {reward.pointsNeeded} more points to unlock {reward.brand}.
          </p>
        </div>
      </div>
      <ProgressBar value={progress} color="#0284c7" />
      <div className="flex justify-between text-xs text-neutral-500">
        <span>Current: {currentScore}</span>
        <span>Required: {reward.minimumScore}</span>
      </div>
    </div>
  );
}

function FulfillmentPanel({ reward, summary, code }) {
  const codeBased = ['coupon', 'coupon-link', 'coupon-pin'].includes(reward?.fulfillmentType);

  return (
    <div className="space-y-4 rounded-2xl border border-brand-200 bg-brand-50 p-4">
      <div className="grid gap-3 text-sm text-neutral-700">
        <DetailRow label="Fulfillment type" value={summary.fulfillmentLabel} />
        <DetailRow label="Coupon mode" value={summary.couponMode} />
        <DetailRow
          label="Max use limit"
          value={`${summary.maxUseLimit} use${summary.maxUseLimit === 1 ? '' : 's'}`}
        />
        <DetailRow
          label="Renew after"
          value={summary.renewAfterDays ? `${summary.renewAfterDays} days` : 'No auto-renew'}
        />
        <DetailRow
          label="Confirmation required"
          value={summary.requiresConfirmation ? 'Yes' : 'No'}
        />
      </div>

      {codeBased && (
        <div>
          <p className="text-sm text-neutral-600">Redemption code</p>
          <div className="mt-2 flex items-center justify-between rounded-xl bg-white px-4 py-3">
            <code className="font-mono text-lg font-bold text-brand-700">{code}</code>
            <button
              onClick={() => navigator.clipboard?.writeText(code)}
              className="text-sm font-semibold text-brand-700"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {summary.fulfillmentLink && (
        <a
          href={summary.fulfillmentLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,#132c32,#146d67)] px-4 py-3 text-sm font-semibold text-white"
        >
          Open partner link
        </a>
      )}

      {reward?.fulfillmentType === 'offline' && (
        <div className="rounded-xl bg-white px-4 py-3 text-sm text-neutral-700">
          Show this offer at the counter or billing desk to redeem it in store.
        </div>
      )}

      <p className="text-xs text-neutral-500">
        Valid till {new Date(reward?.expiresAt).toLocaleDateString('en-IN')}
      </p>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs uppercase tracking-[0.14em] text-neutral-500">{label}</span>
      <span className="font-semibold capitalize text-neutral-800">{value}</span>
    </div>
  );
}
