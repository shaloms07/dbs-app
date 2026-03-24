import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@context/UserContext';
import { MOCK_OTP, MOCK_PASSWORD, getSampleUsers } from '@data/mockDbsData';
import { authService } from '@services/authService';
import { setToken } from '@utils/auth';

const SAMPLE_USERS = getSampleUsers();

export default function LoginScreen() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('mobile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    if (otpTimer <= 0) return undefined;

    const timer = window.setInterval(() => {
      setOtpTimer((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [otpTimer]);

  const isValidMobile = /^[6-9]\d{9}$/.test(mobile);

  const handleSelectSampleUser = (sampleUser) => {
    setMobile(sampleUser.mobile);
    setPassword(MOCK_PASSWORD);
    setError('');
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setError('');

    if (!isValidMobile) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }

    if (!password) {
      setError('Enter your password');
      return;
    }

    setLoading(true);
    try {
      await authService.sendOtp(mobile, password);
      setStep('otp');
      setOtpTimer(30);
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifyOtp(mobile, otp);
      setToken(response.token);
      setUser(response.user);
      if (response.isNewUser) {
        navigate('/vehicle-setup');
      } else if ((response.user?.vehicles?.length ?? 0) > 1) {
        navigate('/vehicle-select');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen-wrap flex items-center justify-center px-4 py-8">
      <div className="screen-main">
        <div className="surface-card-strong overflow-hidden rounded-[32px]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_30%),linear-gradient(135deg,#132c32,#146d67_56%,#e98647)] px-6 pb-7 pt-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              TrafficRewards
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight">
              Drive cleaner.
              <br />
              Earn better.
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">
              Each DBS sample profile now has its own mock login, all using the same demo password
              and OTP.
            </p>
          </div>

          <div className="px-6 pb-7 pt-6">
            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {step === 'mobile' ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Demo Credentials
                  </p>
                  <p className="mt-2 text-sm text-neutral-700">Password: {MOCK_PASSWORD}</p>
                  <p className="mt-1 text-sm text-neutral-700">OTP: {MOCK_OTP}</p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-900">
                    Mobile number
                  </label>
                  <div className="flex gap-3">
                    <span className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 font-semibold text-neutral-700">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(event) =>
                        setMobile(event.target.value.replace(/\D/g, '').slice(0, 10))
                      }
                      placeholder="9876543210"
                      className="flex-1 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-900">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                  />
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold text-neutral-900">Sample users</p>
                  <div className="grid gap-3">
                    {SAMPLE_USERS.map((sampleUser) => (
                      <button
                        key={sampleUser.mobile}
                        type="button"
                        onClick={() => handleSelectSampleUser(sampleUser)}
                        className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-left transition hover:border-brand-300 hover:bg-brand-50"
                      >
                        <p className="font-semibold text-neutral-900">
                          {sampleUser.firstName} {sampleUser.lastName}
                        </p>
                        <p className="mt-1 text-sm text-neutral-600">
                          +91 {sampleUser.mobile} - {sampleUser.vehicleCount} vehicle
                          {sampleUser.vehicleCount > 1 ? 's' : ''}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {sampleUser.vehicles
                            .map((vehicle) => vehicle.registrationNumber)
                            .join(', ')}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-neutral-900 px-4 py-3.5 font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
                  OTP was sent to +91 {mobile}. Use{' '}
                  <span className="font-semibold">{MOCK_OTP}</span> to continue.
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-900">
                    One-time password
                  </label>
                  <input
                    type="tel"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-center font-mono text-lg tracking-[0.3em] outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                  />
                  <p className="mt-2 text-xs text-neutral-500">
                    Use the fixed mock OTP: {MOCK_OTP}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 px-4 py-3 text-center text-sm text-neutral-600">
                  {otpTimer > 0 ? (
                    <span>Resend OTP in {otpTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="font-semibold text-brand-700"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-neutral-900 px-4 py-3.5 font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
                >
                  {loading ? 'Verifying...' : 'Verify and continue'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('mobile');
                    setOtp('');
                    setError('');
                    setOtpTimer(0);
                  }}
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 font-semibold text-neutral-700"
                >
                  Back
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
