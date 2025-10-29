import type { ReactNode } from 'react';

import { useOutletContext } from 'react-router';

import { Button } from '@/components/ui/button'; // adjust import if needed

type PageHeaderProps = {
  title: string;
  actions?: ReactNode;
  onToggleMobileNav?: () => void;
  icon?: ReactNode;
};

export function PageHeader({
  title,
  actions,
  onToggleMobileNav,
  icon,
}: PageHeaderProps) {
  const [toggleMobileNav] = useOutletContext<[() => void]>();

  return (
    <div className="max-md:bg-black max-md:text-white max-sm:border-b">
      <div className="mx-auto w-full px-3 lg:px-6">
        <div className="flex h-12 items-center justify-between gap-4 sm:h-16">
          <div className="flex min-w-0 items-center gap-4">
            {/* Mobile nav toggle */}

            <Button
              variant="ghost"
              onClick={onToggleMobileNav ?? toggleMobileNav}
              className={`hover:bg-bg-subtle group flex h-auto w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent p-1 text-sm transition-all ${onToggleMobileNav ? 'md:block' : 'md:hidden'}`}
            >
              {/* Default icon if no custom one passed */}
              {icon ?? (
                <svg
                  // width="800px"
                  // height="800px"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative -top-1"
                >
                  <path
                    d="M5 8H13.75M5 12H19M10.25 16L19 16"
                    stroke="#FFFFFF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Button>

            {/* Title */}
            <div className="flex items-center gap-2">
              <h1 className="text-xs uppercase">{title}</h1>
            </div>
          </div>

          {/* Right-side actions (buttons, filters, etc.) */}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  );
}
