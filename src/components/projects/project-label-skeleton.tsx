import { Skeleton } from '@/components/ui/skeleton';

export function ProjectLabelSkeleton({
  titleTruncateLimit = 120,
  siteTruncateLimit = 130,
  collapsed = false,
}: {
  titleTruncateLimit?: number;
  siteTruncateLimit?: number;
  collapsed?: boolean;
}) {
  const LogoSkeleton = <Skeleton className="size-6 rounded-full" />;

  return (
    <div className="flex items-center gap-1">
      {collapsed ? (
        LogoSkeleton
      ) : (
        <>
          {LogoSkeleton}
          <div className="flex min-w-0 flex-col gap-1 text-left">
            <Skeleton
              className="h-4"
              style={{ width: `${titleTruncateLimit * 0.8}px` }}
            />
            <Skeleton
              className="h-3"
              style={{ width: `${siteTruncateLimit * 0.9}px` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
