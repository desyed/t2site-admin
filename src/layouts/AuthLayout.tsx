import Brand from '@/components/Brand';
import { ModeToggle } from '@/components/mode-toggle';
import { useAuth } from '@/contexts/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  if (isAuthenticated) {
    return (
      <Navigate
        to={from}
        replace
      />
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex h-[90px] items-center justify-between px-6 sm:px-10">
        <div>
          <Brand />
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
      <div className="flex flex-1 justify-center gap-5 sm:items-center sm:p-8">
        <div className="flex flex-1 flex-col gap-5 px-5 max-sm:justify-between sm:max-w-[420px]">
          <Outlet />
          <div className="px-5 pb-10 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <a
              className="underline hover:text-foreground"
              href=""
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              className="underline hover:text-foreground"
              href=""
            >
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
