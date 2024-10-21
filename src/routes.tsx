import { ThemeProvider } from '@/components/theme-provider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardPage from './app/dashboard/page';
import LoginPage from './app/login/page';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DashboardPage />
    ),
  },
  {
    path: "/login",
    element: (
      <LoginPage />
    ),
  }
]);

export default function App() {
  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="t2site-theme"
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
