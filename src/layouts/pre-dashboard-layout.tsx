import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import LogoutAvatar from '@/components/logout-avatar';
import { useAuth } from '@/contexts/auth-provider';

export default function PreDashboardLayout() {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="absolute right-5 top-5 z-20">
        <LogoutAvatar />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center gap-6 sm:items-center sm:p-8">
        <div className="flex w-full gap-5 max-sm:justify-between max-sm:p-4 sm:max-w-md">
          <div className="relative w-full overflow-x-hidden rounded-xl px-6 py-10 sm:bg-card sm:px-8 dark:sm:bg-muted/15">
            <div className="relative">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <div className="z-10 w-full px-5 pb-5 text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <a className="underline hover:text-foreground" href="/terms">
          Terms of Service
        </a>{' '}
        and{' '}
        <a className="underline hover:text-foreground" href="/privacy-policy">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
