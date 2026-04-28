import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { SimpleLayout } from 'src/layouts/simple';
import { AuthCenteredLayout } from 'src/layouts/auth-centered';

import { SplashScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';
import { useAuthContext } from 'src/auth/hooks';


// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/home'));
const RoleSelectionPage = lazy(() => import('src/pages/auth/role-selection'));
const SignInPage = lazy(() => import('src/pages/auth/sign-in'));

export function Router() {
  const { loading } = useAuthContext();

  const routes = useRoutes([
    {
      path: '/',
      element: loading ? (
        <SplashScreen />
      ) : (
        <Navigate to="/auth/role-selection" replace />
      ),
    },
    {
      path: 'auth',
      element: (
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          path: 'role-selection',
          element: (
            <SimpleLayout>
              <RoleSelectionPage />
            </SimpleLayout>
          ),
          index: true,
        },
        {
          path: 'sign-in/:role',
          element: (
            <AuthCenteredLayout>
              <SignInPage />
            </AuthCenteredLayout>
          ),
        },
      ],
    },
    {
      path: 'home',
      element: (
        <AuthGuard>
          <Suspense fallback={<SplashScreen />}>
            <SimpleLayout>
              <HomePage />
            </SimpleLayout>
          </Suspense>
        </AuthGuard>
      ),
    },

    // No match
    { path: '*', element: <Navigate to="/" replace /> },
  ]);

  return routes;
}
