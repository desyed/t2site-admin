import { Skeleton } from '@/components/ui/skeleton';

export function MessageInputAreaSkeleton() {
  return (
    <div className="relative">
      <div className="bg-accent px-2 pb-1 dark:bg-background sm:px-3 sm:pb-2">
        <div className="relative overflow-hidden rounded-lg">
          {/* Textarea area skeleton */}
          <div className="bg-background p-3 dark:bg-muted/50">
            <Skeleton className="h-[40px] w-full animate-pulse" />
          </div>

          {/* Bottom toolbar skeleton */}
          <div className="flex items-center justify-between bg-background p-2 dark:bg-muted/50">
            <div className="flex items-center gap-2">
              {/* Emoji button skeleton */}
              <Skeleton className="size-8 animate-pulse rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              {/* Send button skeleton */}
              <Skeleton className="size-8 animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
