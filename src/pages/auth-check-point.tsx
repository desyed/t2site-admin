import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { authStore } from '@/app/auth/auth.store';
import Brand from '@/components/Brand';
import { getQuery } from '@/lib/utils';

export default function AuthCheckPoint() {
  const navigate = useNavigate();

  useEffect(() => {
    async function initSession() {
      const auth_login = getQuery('auth_login');
      if (auth_login === 'success') {
        const from = getQuery('rp') ?? '/';
        await authStore.fetchSession(true);
        navigate(from, { replace: true });
      }
    }
    initSession();
  }, [navigate]);

  return !getQuery('ocr') ? (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex h-[90px] items-center justify-between px-6 sm:px-10">
        <div>
          <Brand />
        </div>
      </div>
      <div className="mt-20 flex flex-1 flex-col items-center gap-5 px-5">
        <h1 className="text-xl font-bold"> Authentication Checkpoint</h1>
        <p className="text-center text-muted-foreground">
          Please wait while we verify your credentials...
        </p>
        <div className="mt-4 animate-pulse">
          <div className="h-2 w-24 rounded-full bg-primary/40" />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <p className="text-center text-muted-foreground">
        Configuring your workspace settings...
      </p>
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm text-muted-foreground">
          This may take a few moments
        </span>
      </div>
      <div className="mt-4 animate-pulse">
        <div className="h-2 w-24 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}
