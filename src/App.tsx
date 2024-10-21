import { ThemeProvider } from '@/components/theme-provider';
import Routers from './routes';
import { AuthProvider } from '@/contexts/AuthProvider';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider
        defaultTheme="system"
        storageKey="t2site-theme"
      >
        <Routers />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
