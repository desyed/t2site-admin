
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthProvider';

import Routers from './routes';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="system" storageKey="t2site-theme">
          <Routers />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>

      {import.meta.env.DEV && <ReactQueryDevtools position="left" initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
