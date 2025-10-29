import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const ConversationFiltersSkeleton = () => {
  return (
    <>
      {/* Filter Dropdown Skeleton */}
      <Button
        variant="ghost"
        size="sm"
        className="h-6 justify-start px-3 text-sm"
        disabled
      >
        <Skeleton className="h-4 w-16" />
      </Button>

      {/* Sort Dropdown Skeleton */}
      <Button variant="ghost" size="sm" className="h-6 px-3 text-sm" disabled>
        <Skeleton className="h-4 w-32" />
      </Button>
    </>
  );
};
