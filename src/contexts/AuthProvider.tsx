import { delay } from '@/lib/utils';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void | Promise<void>;
  logout: () => void | Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    return storedAuthState === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = async (email: string, password: string) => {
    await delay(1000);
    console.log('User logged in:', email, password);
    toast.promise(delay(1000), {
      loading: 'Loging in...',
      success: () => {
        setIsAuthenticated(true);
        return `You have loged in!!`;
      },
      position: 'top-center',
      duration: 1000,
      error: () => 'Logged in failed'
    });
  };

  const logout = () => {
    toast.promise(delay(500), {
      loading: 'Singing in...',
      success: () => {
        setIsAuthenticated(false);
        return `You have loged out!!`;
      },
      finally: () => {
        console.log('User logged out');
      },
      position: 'top-center',
      duration: 1000,
      error: () => 'Signed out failed !!'
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
