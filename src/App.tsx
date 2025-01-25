import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthProvider';

import Routers from './routes';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="t2site-theme">
        <Routers />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
