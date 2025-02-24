import { createBrowserRouter } from 'react-router';
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
import InvitationLayout from '@/layouts/invitation-layout';
import {
  authMiddlewareLoader,
  privateMiddlewareLoader,
  verifyMiddlewareLoader
} from '@/middlewares/auth-middleware';
import NotFoundPrivate from '@/pages/404-private';
import NavSettings from '@/pages/settings/_components/nav-settings';
import { settingsRoutes } from '@/routers/settings.routes';

export const routes = createBrowserRouter([
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
            children: settingsRoutes,
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
