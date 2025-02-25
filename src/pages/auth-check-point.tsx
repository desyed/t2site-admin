import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { authStore } from '@/app/auth/auth-store';
import Brand from '@/components/Brand';
import { ModeToggle } from '@/components/mode-toggle';
import { getQuery } from '@/lib/utils';
import { queryClient } from '@/query-client';

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
      if (getQuery('ocr') === 'true') {
        const from = getQuery('rp') ?? '/';
        await authStore.fetchSession(true);
        queryClient.resetQueries();
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
        <div>
          <ModeToggle />
        </div>
      </div>
      <div className="mt-20 flex flex-1 flex-col items-center gap-5 px-5 ">
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
      <h1 className="text-2xl font-bold tracking-tight">
        🎉 Welcome to Your New Organization!
      </h1>
      <p className="text-center text-muted-foreground">
        ✨ Your organization has been created successfully. Setting things up
        for you...
      </p>
      <div className="mt-4 animate-pulse">
        <div className="h-2 w-24 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}
