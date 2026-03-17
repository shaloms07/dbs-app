import { useNavigate } from 'react-router-dom';
import BottomNav from '@components/BottomNav';
import Badge from '@components/ui/Badge';
import FullPageSpinner from '@components/ui/FullPageSpinner';
import { useUser } from '@context/UserContext';
import { getBand } from '@constants/scoreBands';
import { useScore } from '@hooks/useScore';
import { formatDateIN, maskString } from '@utils/formatters';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { score } = useScore();

  if (!user) return <FullPageSpinner />;

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  const band = getBand(score?.current ?? 0);

  return (
    <div className="screen-wrap bg-transparent pb-28">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-[rgba(252,247,241,0.82)] backdrop-blur-xl">
        <div className="screen-main flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate('/home')}
            className="rounded-2xl border border-white/70 bg-white/90 p-2.5 shadow-sm"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-neutral-900">Profile</h1>
        </div>
      </header>

      <main className="screen-main space-y-5 px-4 py-5">
        <section className="surface-card-strong overflow-hidden rounded-[32px]">
          <div className="h-28 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.22),_transparent_30%),linear-gradient(135deg,#10252b,#146d67_56%,#d8c27b)]" />
          <div className="px-5 pb-6">
            <div className="-mt-8 flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border-4 border-white bg-brand-100 text-3xl font-bold text-brand-700 shadow-sm">
                {initials}
              </div>
              <div className="pb-2">
                <h2 className="text-2xl font-bold text-neutral-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-neutral-600">{user.email}</p>
              </div>
            </div>
          </div>
        </section>

        <DetailCard title="Account">
          <DetailRow label="Mobile" value={`+91 ${maskString(user.mobile, 2, 2)}`} />
          <DetailRow label="Licence number" value={maskString(user.licence.number, 4, 4)} />
          <DetailRow label="Licence expiry" value={formatDateIN(user.licence.expiryDate)} />
          <div className="flex items-center justify-between rounded-[22px] bg-[rgba(248,243,236,0.92)] px-4 py-3">
            <span className="text-sm text-neutral-500">DBS band</span>
            <Badge
              color={
                band.label === 'Excellent' ? 'green' : band.label === 'Good' ? 'blue' : 'amber'
              }
            >
              {band.label}
            </Badge>
          </div>
        </DetailCard>

        <DetailCard title="Vehicles">
          {user.vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="rounded-[24px] border border-neutral-200 bg-[rgba(248,243,236,0.92)] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold text-brand-900">
                    {vehicle.registrationNumber}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    {vehicle.make} {vehicle.model} • {vehicle.type}
                  </p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-700 shadow-sm">
                  {vehicle.fuelType}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                <span>Insurance expires</span>
                <span className="font-semibold text-neutral-700">
                  {formatDateIN(vehicle.insuranceExpiry)}
                </span>
              </div>
            </div>
          ))}
        </DetailCard>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full rounded-[28px] border border-red-200 bg-white px-4 py-3.5 font-semibold text-red-700 shadow-sm transition hover:bg-red-50"
        >
          Log out
        </button>
      </main>

      <BottomNav />
    </div>
  );
}

function DetailCard({ title, children }) {
  return (
    <section className="surface-card rounded-[30px] p-5">
      <h3 className="mb-4 text-lg font-bold text-neutral-900">{title}</h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-[22px] bg-[rgba(248,243,236,0.92)] px-4 py-3">
      <span className="text-sm text-neutral-500">{label}</span>
      <span className="text-sm font-semibold text-neutral-900">{value}</span>
    </div>
  );
}
