import { Skeleton } from '@/components/ui/skeleton';

export function DashboardContentAreaSkeleton({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`size-full min-h-fit bg-white pb-10 md:rounded-l-xl ${className}`}
    >
      {/* Page Header Skeleton */}
      <div className="border-b max-md:bg-neutral-100">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-6">
          <div className="flex h-12 items-center justify-between gap-4 sm:h-16">
            <div className="flex min-w-0 items-center gap-4">
              {/* Mobile nav toggle skeleton */}
              <Skeleton className="size-8 md:hidden" />

              {/* Title skeleton */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-32" />
              </div>
            </div>

            {/* Right-side actions skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="size-8" />
              <Skeleton className="size-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-screen-xl px-3 py-6 lg:px-6"></div>
    </div>
  );
}
