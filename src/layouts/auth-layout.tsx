import { ChevronLeft } from 'lucide-react';
import { Link, Outlet } from 'react-router';

import Brand from '@/components/Brand';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/site-button';

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-neutral-50 dark:bg-background">
      <div className="absolute right-0 flex h-[60px] w-full items-center justify-between sm:fixed">
        <div>
          <Link to="https://t2site.com">
            <Button
              variant="ghost"
              className="text-foreground hover:bg-transparent hover:underline "
              icon={<ChevronLeft className="size-4" />}
            >
              Back to the website
            </Button>
          </Link>
        </div>
        <div className="mt-6 pr-4">
          <ModeToggle />
        </div>
      </div>
      <div className="mt-16 flex flex-1 flex-col justify-center gap-6 sm:items-center sm:p-8">
        <a href="https://t2site.vercel.app" className="flex justify-center">
          <Brand />
        </a>
        <div className="flex flex-1 flex-col gap-5  max-sm:justify-between sm:max-w-[420px]">
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
