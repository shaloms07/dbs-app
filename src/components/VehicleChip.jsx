import PropTypes from 'prop-types';
import { timeAgo } from '@utils/formatters';

export default function VehicleChip({ vehicle, onTap }) {
  if (!vehicle) return null;

  return (
    <button
      onClick={() => onTap?.(vehicle)}
      className="w-full rounded-[28px] border border-brand-100 bg-[linear-gradient(135deg,rgba(232,244,241,0.94),rgba(255,255,255,0.96))] p-4 text-left shadow-[0_14px_28px_rgba(26,36,40,0.08)] transition-shadow hover:shadow-[0_18px_34px_rgba(26,36,40,0.12)]"
    >
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-brand-900">
          {vehicle.registrationNumber}
        </h3>
        <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-neutral-700 shadow-sm">
          {vehicle.type}
        </span>
      </div>
      <p className="text-sm text-neutral-600">
        {vehicle.make} {vehicle.model} • {vehicle.cc} cc • {vehicle.fuelType}
      </p>
      <div className="mt-3 flex items-center justify-between text-xs text-neutral-600">
        <span>Synced {timeAgo(vehicle.lastSynced)}</span>
        <span className="font-semibold text-brand-700">View details →</span>
      </div>
    </button>
  );
}

VehicleChip.propTypes = {
  vehicle: PropTypes.shape({
    registrationNumber: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    make: PropTypes.string,
    model: PropTypes.string,
    cc: PropTypes.number,
    fuelType: PropTypes.string,
    lastSynced: PropTypes.string,
  }),
  onTap: PropTypes.func,
};
