import { Outlet } from 'react-router';

import Brand from '@/components/Brand';

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-neutral-50 dark:bg-background">
      {/* Dotted Background Pattern */}
      <div className="absolute inset-0 size-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="relative z-10 flex flex-1 flex-col justify-center gap-6 sm:items-center sm:p-8">
        <a href="https://t2site.vercel.app" className="flex justify-center">
          <Brand />
        </a>
        <div className="flex w-full  gap-5 max-sm:justify-between max-sm:p-4 sm:max-w-sm">
          <div className="relative w-full overflow-x-hidden rounded-xl px-6 py-10 dark:border-border sm:border sm:bg-card sm:px-8 sm:shadow-sm dark:sm:bg-muted/15">
            {/* Background Gradient */}
            <div className="absolute inset-0 isolate overflow-hidden bg-white">
              <div className="absolute left-1/2 top-6 size-[80px] -translate-x-1/2 -translate-y-1/2 scale-x-[1.6] mix-blend-overlay">
                <div className="absolute -inset-16 bg-[conic-gradient(from_90deg,#F00_5deg,#EAB308_63deg,#5CFF80_115deg,#1E00FF_170deg,#855AFC_220deg,#3A8BFD_286deg,#F00_360deg)] mix-blend-overlay blur-[50px] saturate-200"></div>
                <div className="absolute -inset-16 bg-[conic-gradient(from_90deg,#F00_5deg,#EAB308_63deg,#5CFF80_115deg,#1E00FF_170deg,#855AFC_220deg,#3A8BFD_286deg,#F00_360deg)] mix-blend-overlay blur-[50px] saturate-200"></div>
              </div>
              <div className="absolute left-1/2 top-6 size-[80px] -translate-x-1/2 -translate-y-1/2 scale-x-[1.6] opacity-10">
                <div className="absolute -inset-16 bg-[conic-gradient(from_90deg,#F00_5deg,#EAB308_63deg,#5CFF80_115deg,#1E00FF_170deg,#855AFC_220deg,#3A8BFD_286deg,#F00_360deg)] mix-blend-overlay blur-[50px] saturate-200"></div>
              </div>
            </div>

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
