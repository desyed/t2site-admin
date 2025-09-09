import { useEffect } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import LoginForm from '@/components/auth/login-form';
import OAuthButton from '@/components/auth/oauth-button';
import { getQuery, removeQueryFromUrl } from '@/lib/utils';

export default function LoginPage() {
  useEffect(() => {
    const error = getQuery('error');
    if (error && error.length > 3) {
      const message = error;
      setTimeout(() => {
        toast.error('Loging Failed', {
          description: message,
          position: 'top-center',
          duration: 1600,
          closeButton: true,
        });
      }, 400);
      removeQueryFromUrl('error');
    }
  }, []);

  return (
    <>
      <h3 className="text-center text-2xl font-semibold ">Login</h3>
      <p className="mb-4 mt-2 text-center text-sm text-muted-foreground">
        Welcome to T2site Admin
      </p>

      <LoginForm />

      <div className="my-6 flex items-center justify-between gap-2.5">
        <div className="h-px w-1/2 bg-border" />
        <div className="shrink-0 text-xs text-muted-foreground">
          OR CONTINUE WITH
        </div>
        <div className="h-px w-1/2 bg-border" />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-6">
        <OAuthButton type="google" label={false} />
        <OAuthButton type="github" label={false} />
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        {`Don't`} have an account?{' '}
        <Link
          className="font-semibold underline hover:text-foreground"
          to="/signup"
        >
          {' '}
          Sign up
        </Link>
      </div>
    </>
  );
}
