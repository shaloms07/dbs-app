import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@context/UserContext';
import whiteLogo from '../media/Trafficrewards Logo-White.png';

export default function VehicleSelectionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, activeVehicle, setActiveVehicle } = useUser();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    if ((user.vehicles?.length ?? 0) <= 1) {
      navigate('/home', { replace: true });
    }
  }, [navigate, user]);

  if (!user) return null;

  const returnTo = location.state?.returnTo || '/home';

  return (
    <div className="screen-wrap flex items-center justify-center px-4 py-8">
      <div className="screen-main">
        <div className="surface-card-strong overflow-hidden rounded-[32px] bg-white">
          <div className="brand-gradient px-6 pb-7 pt-8 text-white">
            <img src={whiteLogo} alt="TrafficRewards" className="h-auto w-48" />
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight">
              Choose your
              <br />
              vehicle.
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">
              Your score, violations, rewards, and tips will follow the vehicle you select.
            </p>
          </div>

          <div className="space-y-4 px-6 pb-7 pt-6">
            {user.vehicles.map((vehicle) => {
              const isActive = vehicle.id === activeVehicle?.id;

              return (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => {
                    setActiveVehicle(vehicle.registrationNumber);
                    navigate(returnTo, { replace: true });
                  }}
                  className={`w-full rounded-[28px] border p-5 text-left transition ${
                    isActive
                      ? 'border-brand-500 bg-brand-50 shadow-[0_14px_28px_rgba(0,88,209,0.14)]'
                      : 'border-neutral-200 bg-white hover:border-brand-300 hover:bg-brand-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-xl font-bold text-brand-900">
                        {vehicle.registrationNumber}
                      </p>
                      <p className="mt-1 text-sm text-neutral-600">
                        {vehicle.make} {vehicle.model} · {vehicle.type}
                      </p>
                    </div>
                    {isActive && (
                      <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                    <span>
                      {vehicle.fuelType} · {vehicle.cc} cc
                    </span>
                    <span className="font-semibold text-brand-700">Continue →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
