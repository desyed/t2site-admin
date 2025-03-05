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
  verifyMiddlewareLoader,
} from '@/middlewares/auth-middleware';
import NotFound from '@/pages/404';
import NotFoundPrivate from '@/pages/404-private';
import AuthCheckPoint from '@/pages/auth-check-point';
import LoginPage from '@/pages/login';
import NavSettings from '@/pages/settings/_components/nav-settings';
import SignupPage from '@/pages/signup';
import { servicesRoutes } from '@/routers/services.routes';
import { settingsRoutes } from '@/routers/settings.routes';
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
            path: '/new-project',
            lazy: () => import('@/pages/new-project'),
          },
          {
            path: '/settings',
            element: <NavSettings />,
            children: settingsRoutes,
          },
          ...servicesRoutes,
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
        lazy: () => import('@/pages/new-project'),
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
