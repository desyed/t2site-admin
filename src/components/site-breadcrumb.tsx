import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

export function SiteBreadcrumb() {
  const location = useLocation();

  // Skip if we're at root
  if (location.pathname === '/') return null;

  const pathSegments = location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => {
      // Build the full path up to this segment
      const fullPath = '/' + array.slice(0, index + 1).join('/');

      // Special case for dashboard
      if (segment === 'dashboard') {
        return {
          label: 'Dashboard',
          path: fullPath,
          isLast: index === array.length - 1,
          segment, // Keep original segment for icon lookup
        };
      }

      // Format the label for other segments
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        label,
        path: fullPath,
        isLast: index === array.length - 1,
        segment, // Keep original segment for icon lookup
      };
    });

  // Don't render if there are no segments
  if (pathSegments.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          // Get icon component for this route

          return (
            <Fragment key={segment.path}>
              {index > 0 && (
                <BreadcrumbSeparator className="text-muted-foreground/40 max-sm:hidden">
                  <ChevronRight className="size-3.5" />
                </BreadcrumbSeparator>
              )}
              <BreadcrumbItem
                className={cn(
                  // Show only first and last items on mobile
                  'transition-colors',
                  index === 0 ? 'flex' : 'max-sm:hidden',
                  { 'max-sm:!flex': segment.isLast }
                )}
              >
                <BreadcrumbPage>
                  <Link
                    to={segment.path}
                    className={cn(
                      'flex items-center rounded-md px-2 py-1',
                      'transition-colors hover:bg-muted/60',
                      {
                        'text-muted-foreground': !segment.isLast,
                        'font-medium text-foreground': segment.isLast,
                      }
                    )}
                  >
                    <span className="max-w-[120px] truncate">
                      {segment.label}
                    </span>
                  </Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
