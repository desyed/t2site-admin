import { Skeleton } from '@/components/ui/skeleton';

interface SidebarSkeletonProps {
  className?: string;
}

export function SidebarSkeleton({ className = '' }: SidebarSkeletonProps) {
  return (
    <div
      className={`flex h-full w-[232px] flex-col rounded-xl border-r border-gray-200 bg-sidebar-primary pt-1 ${className}`}
    >
      {/* Project Name Skeleton */}
      <div className="p-4">
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Navigation Groups Skeleton */}
      <div className="flex-1 space-y-6 p-3">
        {/* Insights Group */}
        <div>
          <Skeleton className="mb-3 h-3 w-16" />
          <div className="space-y-0.5">
            <div className="flex items-center gap-3 rounded-md p-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-3 rounded-md p-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex items-center gap-3 rounded-md p-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Services Group */}
        <div>
          <Skeleton className="mb-3 h-3 w-16" />
          <div className="space-y-0.5">
            <div className="flex items-center gap-3 rounded-md p-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-3 rounded-md p-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Settings Group */}
        <div>
          <Skeleton className="mb-3 h-3 w-16" />
          <div className="space-y-0.5">
            <div className="flex items-center gap-3 rounded-md p-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center gap-3 rounded-md p-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Section Skeleton */}
      <div className="border-t border-gray-200 p-3">
        <div className="mb-4">
          <Skeleton className="mb-3 h-3 w-12" />
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b-2 py-2">
              <div className="flex items-center gap-2">
                <Skeleton className="size-4" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-8" />
            </div>
            <div className="flex items-center justify-between border-b-2 py-2">
              <div className="flex items-center gap-2">
                <Skeleton className="size-4" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
          <Skeleton className="mt-2 h-3 w-32" />
        </div>

        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}

// Skeleton for Project Settings Mode
export function ProjectSettingsSidebarSkeleton({
  className = '',
}: SidebarSkeletonProps) {
  return (
    <div
      className={`flex h-full w-[232px] flex-col rounded-xl border-r border-gray-200 bg-sidebar-primary pt-1 ${className}`}
    >
      {/* Project Name Skeleton */}
      <div className="p-4">
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="flex-1 p-3">
        {/* Back Button Skeleton */}
        <div className="mb-6 flex w-full items-center gap-2 rounded-md px-3 py-2">
          <Skeleton className="size-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Project Settings Categories Skeleton */}
        <div>
          <Skeleton className="mb-3 h-3 w-28" />
          <ul className="space-y-0.5">
            {Array.from({ length: 4 }).map((_, index) => (
              <li key={index}>
                <div className="flex items-center gap-3 rounded-md px-3 py-2">
                  <Skeleton className="size-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Skeleton for Live Desk Mode
export function LiveDeskSidebarSkeleton({
  className = '',
}: SidebarSkeletonProps) {
  return (
    <div
      className={`flex h-full w-[232px] flex-col rounded-xl border-r border-gray-200 bg-sidebar-primary pt-1 ${className}`}
    >
      {/* Project Name Skeleton */}
      <div className="p-4">
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="flex-1 p-3">
        {/* Back Button Skeleton */}
        <div className="mb-6 flex w-full items-center gap-2 rounded-md px-3 py-2">
          <Skeleton className="size-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Live Desk Categories Skeleton */}
        <div>
          <Skeleton className="mb-3 h-3 w-20" />
          <ul className="space-y-0.5">
            {Array.from({ length: 4 }).map((_, index) => (
              <li key={index}>
                <div className="flex items-center gap-3 rounded-md px-3 py-2">
                  <Skeleton className="size-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Skeleton for Cookie Consent Mode
export function CookieConsentSidebarSkeleton({
  className = '',
}: SidebarSkeletonProps) {
  return (
    <div
      className={`flex h-full w-[232px] flex-col rounded-xl border-r border-gray-200 bg-sidebar-primary pt-1 ${className}`}
    >
      {/* Project Name Skeleton */}
      <div className="p-4">
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="flex-1 p-3">
        {/* Back Button Skeleton */}
        <div className="mb-6 flex w-full items-center gap-2 rounded-md px-3 py-2">
          <Skeleton className="size-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Cookie Consent Categories Skeleton */}
        <div>
          <Skeleton className="mb-3 h-3 w-28" />
          <ul className="space-y-0.5">
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <div className="flex items-center gap-3 rounded-md px-3 py-2">
                  <Skeleton className="size-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
