import { Link } from 'react-router';

import OAuthButton from '@/components/auth/oauth-button';
import SingupForm from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <>
      <h3 className="text-center text-2xl font-semibold ">Signup</h3>
      <p className="mb-2 mt-4 text-center text-sm text-muted-foreground">
        Signup with your Google or Github account
      </p>

      <div className="mt-2 grid grid-cols-2 gap-6">
        <OAuthButton type="google" label={false} />
        <OAuthButton type="github" label={false} />
      </div>

      <div className="mb-2 mt-4 flex items-center justify-between gap-2.5">
        <div className="h-px w-1/2 bg-border" />
        <div className="shrink-0 text-xs text-muted-foreground">
          OR CONTINUE WITH
        </div>
        <div className="h-px w-1/2 bg-border" />
      </div>

      <SingupForm />

      <div className="mt-5 text-center text-muted-foreground">
        I already have an account
        <Link
          className="cursor-pointer font-semibold underline hover:text-foreground"
          to="/login"
        >
          {' '}
          Log in
        </Link>
      </div>
    </>
  );
}
