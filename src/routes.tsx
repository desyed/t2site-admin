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
            path: 'billing',
            lazy: async () => {
              const module = await import('@/pages/dashboard/billing');
              return { element: <module.default /> };
            },
          },
        ],
      },
      // {
      //   element: <DashboardLayout />,
      //   loader: dashboardLoader,
      //   children: [
      //     {
      //       index: true,
      //       element: <Navigate to="/dashboard" />,
      //     },
      //     {
      //       path: '/dashboard',
      //       lazy: () => import('@/pages/home'),
      //     },
      //     {
      //       path: '/tickets',
      //       lazy: () => import('@/pages/tickets'),
      //     },
      //     {
      //       path: '/settings/project',
      //       element: <NavSettingsProject />,
      //       children: [
      //         {
      //           index: true,
      //           lazy: () => import('@/pages/projects/settings/index'),
      //         },
      //         {
      //           path: 'services',
      //           lazy: () => import('@/pages/projects/settings/services'),
      //           loader: dashboardLoader,
      //         },
      //         {
      //           path: '*',
      //           element: <NotFoundProjectSettings />,
      //         },
      //       ],
      //     },
      //     {
      //       path: 'services',
      //       children: [
      //         {
      //           index: true,
      //           element: <Navigate to="/settings/project/services" />,
      //         },
      //         {
      //           path: '/services/web-analytics',
      //           lazy: () => import('@/pages/services/web-analytics'),
      //         },
      //         {
      //           path: '/services/chat-assistant',
      //           lazy: () => import('@/pages/services/chat-assistant'),
      //           children: [
      //             {
      //               index: true,
      //               element: <SelectNoConversation />,
      //             },
      //             {
      //               path: ':ticketId/*',
      //               lazy: () =>
      //                 import('@/pages/services/chat-assistant/conversation'),
      //             },
      //             {
      //               path: 'not-found',
      //               element: <SelectNotFoundConversation />,
      //             },
      //           ],
      //         },
      //         {
      //           path: '/services/cookie-consent',
      //           lazy: () => import('@/pages/services/cookie-consent'),
      //         },
      //         {
      //           path: '*',
      //           element: <NotFoundPrivate />,
      //         },
      //       ],
      //     },
      //     {
      //       path: '*',
      //       element: <NotFoundPrivate />,
      //     },
      //   ],
      // },
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
