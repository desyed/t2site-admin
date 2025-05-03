import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function ConversationItemSkeleton({
  count = 1,
}: {
  count?: number;
}) {
  const items = Array.from({ length: count });
  return (
    <>
      {items.map((_, idx) => (
        <div
          key={idx}
          className={cn(
            'flex w-full items-center gap-3 border-b px-3 py-2',
            'animate-pulse'
          )}
        >
          <Skeleton className="size-7 rounded-full" />

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-1/3 rounded-md" />
              <Skeleton className="h-3 w-1/4 rounded-md" />
            </div>
            <Skeleton className="h-3 w-3/4 rounded-md" />
          </div>
        </div>
      ))}
    </>
  );
}
