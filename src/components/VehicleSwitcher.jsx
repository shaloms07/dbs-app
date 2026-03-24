import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@context/UserContext';

export default function VehicleSwitcher({ compact = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, activeVehicle } = useUser();

  if (!user || !activeVehicle) return null;

  const vehicleCount = user.vehicles?.length ?? 0;

  if (vehicleCount <= 1) {
    return (
      <div
        className={`rounded-2xl border border-white/70 bg-white/90 px-3 py-2 text-left shadow-sm ${
          compact ? 'min-w-[150px]' : 'w-full'
        }`}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Active vehicle
        </p>
        <p className="mt-1 font-mono text-sm font-semibold text-neutral-900">
          {activeVehicle.registrationNumber}
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        navigate('/vehicle-select', {
          state: { returnTo: `${location.pathname}${location.search}` },
        })
      }
      className={`rounded-2xl border border-white/70 bg-white/90 px-3 py-2 text-left shadow-sm transition hover:border-brand-300 hover:bg-brand-50 ${
        compact ? 'min-w-[170px]' : 'w-full'
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        Vehicle switcher
      </p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <span className="font-mono text-sm font-semibold text-neutral-900">
          {activeVehicle.registrationNumber}
        </span>
        <span className="text-xs font-semibold text-brand-700">{vehicleCount} vehicles</span>
      </div>
    </button>
  );
}
