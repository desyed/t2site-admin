import { InpuLoginForm } from '@/components/LoginForm';
import { Link } from 'react-router-dom';
import OAuthStack from '@/components/OAuthStack';

export default function LoginPage() {
  return (
    <div className="rounded-xl border-border/60 bg-muted/50 px-6 pb-10 pt-6 sm:border sm:dark:bg-muted/30">
      <h3 className="mb-10 text-2xl font-semibold max-sm:text-center sm:mb-5 sm:text-xl">
        Login
      </h3>
      <InpuLoginForm />
      <div className="my-5 flex items-center justify-between gap-5">
        <div className="h-[1px] w-[50%] bg-border"></div>
        <div>OR</div>
        <div className="h-[1px] w-[50%] bg-border"></div>
      </div>
      <div className="flex gap-4">
        <OAuthStack />
      </div>
      <div className="mt-4 text-center text-muted-foreground">
        {`Don't`} have an account?{' '}
        <Link
          className="underline hover:text-foreground"
          to="/signup"
        >
          {' '}
          Sign up
        </Link>
      </div>
    </div>
  );
}
