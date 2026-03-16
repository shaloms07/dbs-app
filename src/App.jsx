import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from '@components/ErrorBoundary';
import FullPageSpinner from '@components/ui/FullPageSpinner';
import { UserProvider } from '@context/UserContext';
import { ScoreProvider } from '@context/ScoreContext';
import { UIProvider } from '@context/UIContext';
import { useUser } from '@context/UserContext';

// Lazy load screens
const LoginScreen = lazy(() => import('@screens/LoginScreen'));
const HomeScreen = lazy(() => import('@screens/HomeScreen'));

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
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </UIProvider>
        </ScoreProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}
