import { cn } from '@/lib/utils';

interface MessageSkeletonProps {
  isAssistant?: boolean;
}

export function MessageSkeleton({ isAssistant = false }: MessageSkeletonProps) {
  return (
    <div>
      <div
        className={cn(
          'flex gap-3',
          isAssistant ? 'flex-row' : 'flex-row-reverse'
        )}
      >
        <div className="size-8 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div
            className={cn(
              'rounded-lg p-4',
              isAssistant
                ? 'bg-white dark:bg-neutral-800'
                : 'bg-primary text-primary-foreground',
              'animate-pulse'
            )}
          >
            <div className="space-y-2">
              <div className="h-4 w-[250px] rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-4 w-[200px] rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-4 w-[150px] rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
