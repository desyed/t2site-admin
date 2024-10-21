import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SplashScreen from '@/components/SplashScreen';
import ErrorBoundary from '@/components/ErrorBoundary';
import RootLayout from '@/layouts/RootLayout';
import PrivateLayout from '@/layouts/PrivateLayout';
import { delay } from '@/lib/utils';
import AuthLayout from '@/layouts/AuthLayout';
import NotFound from '@/pages/404';
import LoginPage from './pages/login/LoginPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,

    children: [
      {
        loader: async () => {
          // Pre - session check
          await delay(1000);
          return [];
        },
        element: <PrivateLayout />,
        children: [
          {
            index: true,
            lazy: () => import('@/pages/home/HomePage')
          }
        ]
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <LoginPage />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default function Routers() {
  return (
    <RouterProvider
      router={routes}
      fallbackElement={<SplashScreen />}
    />
  );
}
