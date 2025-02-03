import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import ErrorBoundary from '@/components/error-boundary';
import SplashScreen from '@/components/splash-screen';
import AuthLayout from '@/layouts/auth-layout';
import PrivateLayout from '@/layouts/private-layout';
import RootLayout from '@/layouts/root-layout';
import VerifyLayout from '@/layouts/verify-layout';
import NotFound from '@/pages/404';
import AuthCheckPoint from '@/pages/auth-check-point';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';

import {
  authMiddlewareLoader,
  privateMiddlewareLoader,
  verifyMiddlewareLoader
} from './middlewares/auth-middleware';

import NotFoundPrivate from './pages/404-private';
import NavSettings from './pages/settings/_components/nav-settings';
import NotFoundSettings from './pages/settings/404';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    hydrateFallbackElement: <SplashScreen />,
    children: [
      {
        element: <PrivateLayout />,
        loader: privateMiddlewareLoader,
        children: [
          {
            index: true,
            lazy: () => import('@/pages/home'),
          },
          {
            path: '/tickets',
            lazy: () => import('@/pages/tickets'),
          },
          {
            path: '/settings',
            element: <NavSettings />,
            children: [
              {
                index: true,
                element: <Navigate to="/settings/project" />,
              },
              {
                path: '/settings/project',
                children: [
                  {
                    index: true,
                    lazy: () =>
                      import('@/pages/settings/project'),
                  },
                ],
              },
              {
                path: '/settings/organization',
                children: [
                  {
                    index: true,
                    lazy: () =>
                      import(
                        '@/pages/settings/organization/general'
                      ),
                  },
                  {
                    path: '/settings/organization/members',
                    lazy: () =>
                      import(
                        '@/pages/settings/organization/members'
                      ),
                  },
                ],
              },
              {
                path: '*',
                element: <NotFoundSettings />,
              },
            ],
          },
          {
            path: '*',
            element: <NotFoundPrivate />,
          },
        ],
      },
      {
        loader: authMiddlewareLoader,
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/signup',
            element: <SignupPage />,
          },
        ],
      },
      {
        loader: verifyMiddlewareLoader,
        path: '/verify',
        element: <VerifyLayout />,
        children: [
          {
            index: true,
            lazy: () => import('@/pages/verify'),
          },
        ],
      },
      {
        path: '/auth',
        element: <AuthCheckPoint />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default function Routers() {
  return <RouterProvider router={routes} />;
}
