import { Outlet } from 'react-router';

import Brand from '@/components/Brand';
import { ModeToggle } from '@/components/mode-toggle';

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="absolute right-0 flex h-[90px] items-center justify-between px-6 sm:px-10">
        <div></div>
        <div>
          <ModeToggle />
        </div>
      </div>
      <div className="mt-16 flex flex-1 flex-col justify-center gap-6 sm:items-center sm:p-8">
        <a href="https://t2site.vercel.app" className="flex justify-center">
          <Brand />
        </a>
        <div className="flex flex-1 flex-col gap-5  max-sm:justify-between sm:max-w-[390px]">
          <div className="overflow-x-hidden rounded-xl border-border/60 bg-transparent px-6 pb-10 sm:border sm:bg-muted/50 sm:pt-6 dark:sm:bg-muted/30">
            <Outlet />
          </div>

          <div className="px-5 pb-10 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <a className="underline hover:text-foreground" href="/terms">
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              className="underline hover:text-foreground"
              href="/privacy-policy"
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
