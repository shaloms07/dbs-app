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
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <AppRoutes />
              <Modal />
            </BrowserRouter>
          </UIProvider>
        </ScoreProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}
