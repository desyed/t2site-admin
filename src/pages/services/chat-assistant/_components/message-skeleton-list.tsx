import { Skeleton } from '@/components/ui/skeleton';

export function MessageSkeletonList() {
  return (
    <div className="mb-3 space-y-1">
      {/* Timestamp Skeleton */}
      <div className="mb-2 flex justify-center">
        <Skeleton className="h-4 w-20 animate-pulse rounded-full bg-gray-500/30" />
      </div>

      {/* Other Message (left) */}
      <div className="flex items-end gap-2">
        <div className="flex max-w-[60%] flex-col">
          <Skeleton className="h-5 w-[100px] animate-pulse rounded-2xl  bg-neutral-800/80" />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <div className="flex max-w-[60%] flex-col">
          <Skeleton className="h-7 w-[180px] animate-pulse rounded-2xl  bg-neutral-800/80" />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <div className="flex max-w-[60%] flex-col">
          <Skeleton className="h-7 w-[140px] animate-pulse rounded-2xl  bg-neutral-800/80" />
        </div>
      </div>

      {/* Other Message (left, grouped) */}

      {/* Timestamp Skeleton */}
      <div className="my-2 flex justify-center">
        <Skeleton className="h-4 w-16 animate-pulse rounded-full bg-gray-500/30" />
      </div>

      {/* User Message (right) */}
      <div className="flex flex-row-reverse items-end gap-2">
        <div className="mr-9 flex max-w-[60%] flex-col items-end">
          <Skeleton className="h-10 w-[150px] animate-pulse rounded-2xl bg-yellow-300/80" />
        </div>
      </div>

      {/* User Message (right, grouped) */}
      <div className="flex flex-row-reverse items-end gap-2">
        <Skeleton className="size-7 animate-pulse rounded-full bg-yellow-300/80" />
        <div className="flex max-w-[60%] flex-col items-end">
          <Skeleton className="h-6 w-[100px] animate-pulse rounded-2xl bg-yellow-300/80" />
        </div>
      </div>
    </div>
  );
}
