import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@context/UserContext';
import { authService } from '@services/authService';
import { setToken } from '@utils/auth';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [mobile, setMobile] = useState('');
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

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setError('');

    if (!isValidMobile) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      await authService.sendOtp(mobile);
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
      navigate(response.isNewUser ? '/vehicle-setup' : '/home');
    } catch (err) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          TrafficRewards
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-neutral-900">
          Driver score access
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Sign in with your mobile number to view your score, rewards, and driving profile.
        </p>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {step === 'mobile' ? (
          <form onSubmit={handleSendOtp} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-900">
                Mobile number
              </label>
              <div className="flex gap-3">
                <span className="rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-semibold text-neutral-700">
                  +91
                </span>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(event) =>
                    setMobile(event.target.value.replace(/\D/g, '').slice(0, 10))
                  }
                  placeholder="9876543210"
                  className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-brand-500"
                />
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                Enter a 10-digit number starting with 6, 7, 8, or 9.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-900">
                One-time password
              </label>
              <input
                type="text"
                value={otp}
                onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-center font-mono text-lg tracking-[0.3em] outline-none transition focus:border-brand-500"
              />
              <p className="mt-2 text-xs text-neutral-500">
                Mock mode: you can enter any 6 digits.
              </p>
            </div>

            <div className="text-center text-sm text-neutral-600">
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
              className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
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
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
