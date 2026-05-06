import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { AuthCenteredLayout } from 'src/layouts/auth-centered';

import { SplashScreen } from 'src/components/loading-screen';

import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

const RoleSelectPage = lazy(() => import('src/pages/auth/role-select'));
const RoleLoginPage = lazy(() => import('src/pages/auth/role-login'));
const StartupSplashPage = lazy(() => import('src/pages/auth/startup-splash'));

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <Suspense fallback={<SplashScreen />}>
          <StartupSplashPage />
        </Suspense>
      ),
    },
    {
      path: '/role-selection',
      element: (
        <Suspense fallback={<SplashScreen />}>
          <AuthCenteredLayout
            sx={{
              '--layout-auth-content-width': '980px',
            }}
          >
            <RoleSelectPage />
          </AuthCenteredLayout>
        </Suspense>
      ),
    },
    {
      path: '/login/:role',
      element: (
        <Suspense fallback={<SplashScreen />}>
          <AuthCenteredLayout>
            <RoleLoginPage />
          </AuthCenteredLayout>
        </Suspense>
      ),
    },
    { path: '/login', element: <Navigate to="/login/teacher" replace /> },
    ...dashboardRoutes,

    // No match
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
