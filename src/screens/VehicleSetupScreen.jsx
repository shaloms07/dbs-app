import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@context/UserContext';
import { useScoreContext } from '@context/ScoreContext';
import { SAMPLE_REGISTRATIONS } from '@data/mockDbsData';
import { scoreService } from '@services/scoreService';
import { userService } from '@services/userService';

export default function VehicleSetupScreen() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { setScore } = useScoreContext();
  const [regNumber, setRegNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('Private Car');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async (event) => {
    event.preventDefault();
    setError('');

    const normalized = regNumber.replace(/\s+/g, '').toUpperCase();
    if (normalized.length < 8) {
      setError('Enter a valid vehicle registration number');
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await userService.addVehicle(normalized, vehicleType);
      const nextScore = await scoreService.getScore();
      setUser(updatedUser);
      setScore(nextScore);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Unable to add vehicle right now');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-white to-blue-50 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="font-display text-3xl font-bold text-neutral-900">Add your vehicle</h1>
        <p className="mt-2 text-sm text-neutral-600">
          We&apos;ll use this to show your score, violations, and renewal benefits.
        </p>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleContinue} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-900">
              Registration number
            </label>
            <input
              value={regNumber}
              onChange={(event) => setRegNumber(event.target.value.toUpperCase())}
              placeholder="MH31AB1234"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 font-mono outline-none transition focus:border-brand-500"
            />
            <p className="mt-2 text-xs text-neutral-500">
              Try one of the sample registrations below to preview the DBS reference data.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SAMPLE_REGISTRATIONS.map((sampleRegistration) => (
                <button
                  key={sampleRegistration}
                  type="button"
                  onClick={() => setRegNumber(sampleRegistration)}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 font-mono text-xs text-neutral-700 transition hover:border-brand-300 hover:bg-brand-50"
                >
                  {sampleRegistration}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-neutral-900">Vehicle type</label>
            <div className="grid gap-3">
              {['Private Car', 'Two-Wheeler', 'Three-Wheeler'].map((type) => (
                <label
                  key={type}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 ${
                    vehicleType === type ? 'border-brand-500 bg-brand-50' : 'border-neutral-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="vehicleType"
                    value={type}
                    checked={vehicleType === type}
                    onChange={(event) => setVehicleType(event.target.value)}
                  />
                  <span className="font-medium text-neutral-800">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? 'Setting up...' : 'Continue'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/home')}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700"
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  );
}
