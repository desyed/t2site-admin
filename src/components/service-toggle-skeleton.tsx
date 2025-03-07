import { Skeleton } from '@/components/ui/skeleton';

export function ServiceToggleSkeleton() {
  return (
    <div className="flex items-start justify-between p-3">
      <div className="w-full max-w-[80%] space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-full" /> {/* Icon */}
            <Skeleton className="h-5 w-32" /> {/* Title */}
          </div>
          <div className="mt-1">
            <Skeleton className="h-4 w-full max-w-[250px]" />{' '}
            {/* Description */}
          </div>
        </div>
        <ul className="space-y-1.5">
          {/* Features - showing 3 items */}
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex items-center gap-1">
              <Skeleton className="size-1 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </li>
          ))}
        </ul>
      </div>
      <Skeleton className="h-6 w-11 rounded-full" /> {/* Switch */}
    </div>
  );
}
