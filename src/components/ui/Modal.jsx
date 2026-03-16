import { useEffect, useRef } from 'react';
import { useUI } from '@context/UIContext';
import ProgressBar from './ProgressBar';

export default function Modal() {
  const { activeModal, closeModal, modalData } = useUI();
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!activeModal) return undefined;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  if (!activeModal) return null;

  return (
    <div
      ref={backdropRef}
      onClick={(event) => {
        if (event.target === backdropRef.current) closeModal();
      }}
      className="fixed inset-0 z-40 bg-black/40"
    >
      <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-h-[88vh] max-w-screen-sm overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex justify-center">
          <div className="h-1.5 w-12 rounded-full bg-neutral-300" />
        </div>
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-neutral-100"
          aria-label="Close modal"
        >
          ✕
        </button>
        {renderModalContent(activeModal, modalData)}
      </div>
    </div>
  );
}

function renderModalContent(name, data) {
  if (name === 'vehicle-details') return <VehicleDetailsModal vehicle={data} />;
  if (name === 'dispute-challan') return <DisputeChallanModal challan={data} />;
  if (name === 'redeem-reward') return <RedeemRewardModal reward={data} />;
  if (name === 'locked-reward') return <LockedRewardModal reward={data} />;
  return <div className="text-sm text-neutral-600">Unknown modal</div>;
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
  const code = reward?.redemptionValue || 'TRCODE123';

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-neutral-900">{reward?.brand}</h2>
      <p className="text-sm text-neutral-600">{reward?.offerTitle}</p>
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4">
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
        <p className="mt-3 text-xs text-neutral-500">
          Valid till {new Date(reward?.expiresAt).toLocaleDateString('en-IN')}
        </p>
      </div>
    </div>
  );
}

function LockedRewardModal({ reward }) {
  const currentScore = 742;
  const progress = Math.min((currentScore / reward.minimumScore) * 100, 100);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-neutral-900">This reward is locked</h2>
      <p className="text-sm text-neutral-600">
        You need {reward.pointsNeeded} more points to unlock {reward.brand}.
      </p>
      <ProgressBar value={progress} color="#0284c7" />
      <div className="flex justify-between text-xs text-neutral-500">
        <span>Current: {currentScore}</span>
        <span>Required: {reward.minimumScore}</span>
      </div>
    </div>
  );
}
