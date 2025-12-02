import { createBrowserRouter, redirect } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import ErrorBoundary from '@/components/error-boundary';
import SplashScreen from '@/components/splash-screen';
import AuthLayout from '@/layouts/auth-layout';
import InvitationLayout from '@/layouts/invitation-layout';
import PreDashboardLayout from '@/layouts/pre-dashboard-layout';
import RootLayout from '@/layouts/root-layout';
import {
  authMiddlewareLoader,
  dashboardLoader,
  privateLoader,
  verifyMiddlewareLoader,
} from '@/middlewares/auth-middleware';
import NotFound from '@/pages/404';
import AuthCheckPoint from '@/pages/auth-check-point';
import NotFoundProject from '@/pages/dashboard/404';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';

import ProjectLayout from './layouts/project-layout';
import SelectNoConversation from './pages/dashboard/live-desk/live-chat/_components/select-no-conversation';
import SelectNotFoundConversation from './pages/dashboard/live-desk/live-chat/_components/select-not-found-conversation';

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
        path: '/',
        lazy: () => import('@/pages/projects'),
      },
      {
        path: '/auth',
        element: <AuthCheckPoint />,
      },
      {
        loader: verifyMiddlewareLoader,
        path: '/verify',
        element: <PreDashboardLayout />,
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
        path: '/create-project',
        element: <PreDashboardLayout />,
        loader: privateLoader,
        children: [
          {
            index: true,
            lazy: () => import('@/pages/projects/create-project'),
          },
        ],
      },
      {
        path: '/account-settings',
        element: <ProjectLayout />,
        loader: privateLoader,
        children: [
          {
            index: true,
            lazy: async () => {
              const module = await import('@/pages/account-settings');
              return { element: <module.default /> };
            },
          },
          {
            path: 'billing-information',
            lazy: async () => {
              const module = await import(
                '@/pages/account-settings/billing-information'
              );
              return { element: <module.default /> };
            },
          },
          {
            path: 'billing-items',
            lazy: async () => {
              const module = await import(
                '@/pages/account-settings/billing-items'
              );
              return { element: <module.default /> };
            },
          },
          {
            path: 'invoices',
            lazy: async () => {
              const module = await import('@/pages/account-settings/invoices');
              return { element: <module.default /> };
            },
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
            lazy: async () => {
              const module = await import('@/pages/dashboard/analytics');
              return { element: <module.default /> };
            },
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
            path: 'live-desk',
            children: [
              {
                index: true,
                loader: () => {
                  return redirect('live-chat');
                },
              },
              {
                path: 'live-chat',
                lazy: () => import('@/pages/dashboard/live-desk/live-chat'),
                children: [
                  {
                    index: true,
                    element: <SelectNoConversation />,
                  },
                  {
                    path: ':ticketId/*',
                    lazy: () =>
                      import(
                        '@/pages/dashboard/live-desk/live-chat/conversation'
                      ),
                  },
                  {
                    path: 'not-found',
                    element: <SelectNotFoundConversation />,
                  },
                ],
              },
              {
                path: 'facebook',
                lazy: () => import('@/pages/dashboard/live-desk/facebook'),
              },
              {
                path: 'whatsapp',
                lazy: () => import('@/pages/dashboard/live-desk/whatsapp'),
              },
              {
                path: 'email',
                lazy: () => import('@/pages/dashboard/live-desk/email'),
              },
            ],
          },
          {
            path: 'project-settings',
            lazy: () => import('@/pages/dashboard/project-settings'),
          },
          {
            path: 'project-settings/team-members',
            lazy: () =>
              import('@/pages/dashboard/project-settings/team-members'),
          },
          {
            path: 'project-settings/integrations',
            lazy: () =>
              import('@/pages/dashboard/project-settings/integrations'),
          },
          {
            path: 'project-settings/security',
            lazy: () => import('@/pages/dashboard/project-settings/security'),
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
        path: '/404-project',
        element: <NotFoundProject />,
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
