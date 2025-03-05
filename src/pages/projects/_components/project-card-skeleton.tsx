import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProjectCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden">
      <div className="flex items-center gap-4 p-4">
        {/* Project Icon Skeleton */}
        <div className="shrink-0">
          <Skeleton className="size-8 rounded-md" />
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-start justify-between gap-4">
            {/* Project Name Skeleton */}
            <Skeleton className="h-5 w-[140px]" />
            {/* Date Skeleton */}
            <Skeleton className="h-4 w-[100px]" />
          </div>
          {/* URL Skeleton */}
          <Skeleton className="h-4 w-[180px]" />
        </div>

        {/* Action Button Skeleton */}
        <div className="shrink-0">
          <Skeleton className="size-8 rounded-md" />
        </div>
      </div>
    </Card>
  );
}

// You can also create a repeating skeleton list component
export function ProjectListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
}
