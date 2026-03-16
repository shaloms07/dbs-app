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
    <div className="min-h-screen bg-neutral-50 pb-24">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-screen-sm items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate('/home')}
            className="rounded-full bg-neutral-100 p-2"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-neutral-900">Profile</h1>
        </div>
      </header>

      <main className="mx-auto max-w-screen-sm space-y-6 px-4 py-6">
        <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="h-24 bg-gradient-to-r from-brand-600 to-blue-500" />
          <div className="px-5 pb-5">
            <div className="-mt-10 flex items-end gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-brand-100 text-2xl font-bold text-brand-700">
                {initials}
              </div>
              <div className="pb-2">
                <h2 className="text-2xl font-bold text-neutral-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-neutral-500">{user.email}</p>
              </div>
            </div>
          </div>
        </section>

        <DetailCard title="Account">
          <DetailRow label="Mobile" value={`+91 ${maskString(user.mobile, 2, 2)}`} />
          <DetailRow label="Licence number" value={maskString(user.licence.number, 4, 4)} />
          <DetailRow label="Licence expiry" value={formatDateIN(user.licence.expiryDate)} />
          <div className="flex items-center justify-between">
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
            <div key={vehicle.id} className="rounded-2xl bg-neutral-50 p-4">
              <p className="font-display text-lg font-bold text-brand-900">
                {vehicle.registrationNumber}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {vehicle.make} {vehicle.model} • {vehicle.type}
              </p>
              <p className="mt-2 text-xs text-neutral-500">
                Insurance expires {formatDateIN(vehicle.insuranceExpiry)}
              </p>
            </div>
          ))}
        </DetailCard>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-700"
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
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-neutral-900">{title}</h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-neutral-500">{label}</span>
      <span className="text-sm font-semibold text-neutral-900">{value}</span>
    </div>
  );
}
