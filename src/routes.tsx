import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import ErrorBoundary from '@/components/ErrorBoundary';
import SplashScreen from '@/components/SplashScreen';
import AuthLayout from '@/layouts/AuthLayout';
import PrivateLayout from '@/layouts/PrivateLayout';
import RootLayout from '@/layouts/RootLayout';
import VerifyLayout from '@/layouts/VerifyLayout';
import NotFound from '@/pages/404';
import AuthCheckPoint from '@/pages/AuthCheckPoint';
import LoginPage from '@/pages/login/LoginPage';
import SignupPage from '@/pages/signup/SignupPage';

import { authMiddlewareLoader } from './middlewares/authMiddlewareLoader';
import { privateMiddlewareLoader } from './middlewares/privateMiddlewareLoader';
import { verifyMiddlewareLoader } from './middlewares/verifyMiddlewareLoader';
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
            lazy: () => import('@/pages/home/HomePage'),
          },
          {
            path: '/tickets',
            lazy: () => import('@/pages/tickets/TicketsPage'),
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
                      import('@/pages/settings/project/ProjectSettingsPage'),
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
                        '@/pages/settings/organization/general/OrgGeneralSettingsPage'
                      ),
                  },
                  {
                    path: '/settings/organization/members',
                    lazy: () =>
                      import(
                        '@/pages/settings/organization/members/MemberSettingsPage'
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
            lazy: () => import('@/pages/verify/VerifyPage'),
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
