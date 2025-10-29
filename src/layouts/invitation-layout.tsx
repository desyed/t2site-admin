import { Outlet } from 'react-router';

import Brand from '@/components/Brand';

export default function InvitationLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-neutral-50 dark:bg-background">
      <div className="mt-16 flex flex-1 flex-col justify-center gap-8 sm:items-center sm:p-8">
        <div className="flex justify-center">
          <Brand />
        </div>
        <div className="flex flex-1 flex-col gap-5 max-sm:justify-between sm:max-w-[420px]">
          <div className="overflow-x-hidden rounded-xl px-6 pb-10 dark:border-border sm:border sm:bg-card sm:pt-6 sm:shadow-sm dark:sm:bg-muted/15">
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
