import { ThemeProvider } from '@/components/theme-provider';
import Routers from './routes';
import { AuthProvider } from '@/contexts/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider
        defaultTheme="system"
        storageKey="t2site-theme"
      >
        <Routers />
      </ThemeProvider>
    </AuthProvider>
  );
}
