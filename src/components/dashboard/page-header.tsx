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
    <div className="border-b max-md:bg-neutral-100">
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
                  height="18"
                  width="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                >
                  <g fill="currentColor">
                    <path
                      d="M4,2.75H14.25c1.105,0,2,.895,2,2V13.25c0,1.105-.895,2-2,2H4"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <rect
                      height="12.5"
                      width="4.5"
                      fill="none"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      x="1.75"
                      y="2.75"
                    />
                  </g>
                </svg>
              )}
            </Button>

            {/* Title */}
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold leading-7">{title}</h1>
            </div>
          </div>

          {/* Right-side actions (buttons, filters, etc.) */}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  );
}
