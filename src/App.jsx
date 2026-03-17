import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from '@components/ErrorBoundary';
import FullPageSpinner from '@components/ui/FullPageSpinner';
import Modal from '@components/ui/Modal';
import { UserProvider } from '@context/UserContext';
import { ScoreProvider } from '@context/ScoreContext';
import { UIProvider } from '@context/UIContext';
import { useUser } from '@context/UserContext';

// Lazy load screens
const LoginScreen = lazy(() => import('@screens/LoginScreen'));
const HomeScreen = lazy(() => import('@screens/HomeScreen'));
const VehicleSetupScreen = lazy(() => import('@screens/VehicleSetupScreen'));
const ScoreBreakdownScreen = lazy(() => import('@screens/ScoreBreakdownScreen'));
const RewardsScreen = lazy(() => import('@screens/RewardsScreen'));
const ProfileScreen = lazy(() => import('@screens/ProfileScreen'));
const ImproveScoreScreen = lazy(() => import('@screens/ImproveScoreScreen'));

function AppRoutes() {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return <FullPageSpinner />;
  }

  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/vehicle-setup" element={<VehicleSetupScreen />} />
            <Route path="/score" element={<ScoreBreakdownScreen />} />
            <Route path="/rewards" element={<RewardsScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/improve" element={<ImproveScoreScreen />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <ScoreProvider>
          <UIProvider>
            <div className="app-shell">
              <div className="app-shell__inner">
                <aside className="app-shell__intro">
                  <div className="app-shell__intro-card">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
                      TrafficRewards
                    </p>
                    <h1 className="mt-4 font-display text-5xl font-bold leading-tight text-neutral-900">
                      Safer driving,
                      <br />
                      cleaner rewards.
                    </h1>
                    <p className="mt-5 max-w-sm text-base leading-7 text-neutral-600">
                      A polished mobile-first driver experience, presented inside a desktop webview
                      shell for demos, QA, and stakeholder reviews.
                    </p>
                    <div className="mt-8 grid gap-4">
                      <div className="surface-card rounded-[28px] p-5">
                        <p className="text-sm font-semibold text-neutral-900">
                          Mobile-first by default
                        </p>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">
                          Optimized for narrow touch screens while still feeling premium on desktop.
                        </p>
                      </div>
                      <div className="surface-card rounded-[28px] p-5">
                        <p className="text-sm font-semibold text-neutral-900">Mock-data friendly</p>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">
                          Perfect for demos, frontend iteration, and design review before backend
                          integration.
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>

                <div className="app-shell__frame">
                  <BrowserRouter
                    basename={import.meta.env.BASE_URL}
                    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
                  >
                    <AppRoutes />
                    <Modal />
                  </BrowserRouter>
                </div>
              </div>
            </div>
          </UIProvider>
        </ScoreProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}
