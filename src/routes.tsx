import ErrorBoundary from '@/components/ErrorBoundary';
import SplashScreen from '@/components/SplashScreen';
import AuthLayout from '@/layouts/AuthLayout';
import PrivateLayout from '@/layouts/PrivateLayout';
import RootLayout from '@/layouts/RootLayout';
import NotFound from '@/pages/404';
import LoginPage from '@/pages/login/LoginPage';
import SignupPage from '@/pages/signup/SignupPage';

import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import VerifyLayout from '@/layouts/VerifyLayout';
import AuthCheckPoint from '@/pages/AuthCheckPoint';
import { verifyMiddlewareLoader } from "./middlewares/verifyMiddlewareLoader";
import { privateMiddlewareLoader } from "./middlewares/privateMiddlewareLoader";
import { authMiddlewareLoader } from "./middlewares/authMiddlewareLoader";


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
            lazy: () => import('@/pages/settings/SettingsPage'),
          },
          {
            path: '/settings/general',
            lazy: () => import('@/pages/settings/general/GeneralSettingsPage'),
          },
          {
            path: '/settings/team',
            lazy: () => import('@/pages/settings/team/TeamSettingsPage'),
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
