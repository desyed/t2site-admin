import { Skeleton } from '@/components/ui/skeleton';

export function ChatHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between border-b px-3 py-2 pt-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-1.5">
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-2 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
