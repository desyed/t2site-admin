import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import ErrorBoundary from '@/components/error-boundary';
import SplashScreen from '@/components/splash-screen';
import AuthLayout from '@/layouts/auth-layout';
import DashboardLayout from '@/layouts/dashboard-layout';
import InvitationLayout from '@/layouts/invitation-layout';
import RootLayout from '@/layouts/root-layout';
import VerifyLayout from '@/layouts/verify-layout';
import {
  authMiddlewareLoader,
  dashboardLoader,
  privateLoader,
  verifyMiddlewareLoader,
} from '@/middlewares/auth-middleware';
import NotFound from '@/pages/404';
import NotFoundPrivate from '@/pages/404-private';
import AuthCheckPoint from '@/pages/auth-check-point';
import LoginPage from '@/pages/login';
import NavSettingsProject from '@/pages/projects/settings/_components/nav-settings';
import NavSettings from '@/pages/settings/_components/nav-settings';
import SignupPage from '@/pages/signup';

import PrivateLayout from './layouts/private-layout';
import NotFoundProjectSettings from './pages/projects/settings/404';
import NotFoundSettings from './pages/settings/404';
export const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    hydrateFallbackElement: <SplashScreen />,
    children: [
      {
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" />,
          },
          {
            path: '/dashboard',
            lazy: () => import('@/pages/home'),
          },
          {
            path: '/tickets',
            lazy: () => import('@/pages/tickets'),
          },
          {
            path: '/settings/project',
            element: <NavSettingsProject />,
            children: [
              {
                index: true,
                lazy: () => import('@/pages/projects/settings/index'),
              },
              {
                path: 'services',
                lazy: () => import('@/pages/projects/settings/services'),
                loader: dashboardLoader,
              },
              {
                path: '*',
                element: <NotFoundProjectSettings />,
              },
            ],
          },
          {
            path: '/web-analytics',
            lazy: () => import('@/pages/services/web-analytics'),
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
        path: '/invitation/:invitedMemberId',
        element: <InvitationLayout />,
        children: [
          {
            index: true,
            lazy: () => import('@/pages/invitation'),
          },
        ],
      },
      {
        path: '/projects',
        element: <PrivateLayout />,
        loader: privateLoader,
        children: [
          {
            index: true,
            lazy: () => import('@/pages/projects'),
          },
          {
            path: '/projects/new',
            lazy: () => import('@/pages/projects/new'),
          },
          {
            path: '/projects/:projectId',
            lazy: () => import('@/pages/projects/project'),
          },
        ],
      },
      {
        path: '/settings',
        element: <PrivateLayout />,
        loader: privateLoader,
        children: [
          {
            path: '/settings',
            element: <NavSettings />,
            children: [
              {
                index: true,
                element: <Navigate to="/settings/organization" />,
              },
              {
                path: '/settings/organization',
                lazy: () => import('@/pages/settings/organization/general'),
              },
              {
                path: '/settings/organization/members',
                lazy: () => import('@/pages/settings/organization/members'),
              },
              {
                path: '/settings/user/profile',
                lazy: () => import('@/pages/settings/user/profile'),
              },
              {
                path: '*',
                element: <NotFoundSettings />,
              },
            ],
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
