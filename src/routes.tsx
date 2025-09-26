import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import ErrorBoundary from '@/components/error-boundary';
import SplashScreen from '@/components/splash-screen';
import AuthLayout from '@/layouts/auth-layout';
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
import AuthCheckPoint from '@/pages/auth-check-point';
import LoginPage from '@/pages/login';
import NavSettings from '@/pages/settings/_components/nav-settings';
import SignupPage from '@/pages/signup';

import PrivateLayout from './layouts/private-layout';
import ProjectLayout from './layouts/project-layout';
import NotFoundSettings from './pages/settings/404';
export const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    hydrateFallbackElement: <SplashScreen />,
    children: [
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
        path: '/auth',
        element: <AuthCheckPoint />,
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
        path: '/:projectId',
        element: <ProjectLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Navigate to="analytics" />,
          },
          {
            path: 'analytics',
            lazy: async () => {
              const module = await import('@/pages/dashboard/analytics');
              return { element: <module.default /> };
            },
          },
          {
            path: 'events',
            lazy: async () => {
              const module = await import('@/pages/dashboard/events');
              return { element: <module.default /> };
            },
          },
          {
            path: 'customers',
            lazy: async () => {
              const module = await import('@/pages/dashboard/customers');
              return { element: <module.default /> };
            },
          },
          {
            path: 'cookie-consent',
            lazy: async () => {
              const module = await import('@/pages/dashboard/cookie-consent');
              return { element: <module.default /> };
            },
          },
          {
            path: 'live-chat',
            lazy: async () => {
              const module = await import('@/pages/dashboard/live-chat');
              return { element: <module.default /> };
            },
          },
          {
            path: 'facebook',
            lazy: async () => {
              const module = await import('@/pages/dashboard/facebook');
              return { element: <module.default /> };
            },
          },
          {
            path: 'whatsapp',
            lazy: async () => {
              const module = await import('@/pages/dashboard/whatsapp');
              return { element: <module.default /> };
            },
          },
          {
            path: 'email',
            lazy: async () => {
              const module = await import('@/pages/dashboard/email');
              return { element: <module.default /> };
            },
          },
          {
            path: 'project-settings',
            lazy: async () => {
              const module = await import('@/pages/dashboard/project-settings');
              return { element: <module.default /> };
            },
          },
          {
            path: 'billing',
            lazy: async () => {
              const module = await import('@/pages/dashboard/billing');
              return { element: <module.default /> };
            },
          },
        ],
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
