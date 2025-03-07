import { useMemo } from 'react';

import type { Organization } from '@/app/organization/organizaion.type';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import MemberRoleBadge from './member-role-badge';

type LabelSize = 'sm' | 'md' | 'lg';

const sizeStyles: Record<
  LabelSize,
  {
    avatar: string;
    container: string;
    name: string;
    badge: 'sm' | 'md' | 'lg';
  }
> = {
  sm: {
    avatar: 'size-6',
    container: 'gap-1.5',
    name: 'text-xs',
    badge: 'sm',
  },
  md: {
    avatar: 'size-7',
    container: 'gap-2',
    name: 'text-sm',
    badge: 'md',
  },
  lg: {
    avatar: 'size-8',
    container: 'gap-2',
    name: 'text-sm',
    badge: 'lg',
  },
};

interface OrganizationLabelProps {
  organization: Organization;
  titleTruncateLimit?: number;
  collapsed?: boolean;
  size?: LabelSize;
  className?: string;
}

export default function OrganizationLabel({
  organization,
  titleTruncateLimit = 120,
  collapsed = false,
  size = 'lg',
  className,
}: OrganizationLabelProps) {
  const styles = sizeStyles[size];

  const LogoImage = useMemo(
    () => (
      <Avatar className={cn('bg-muted', styles.avatar)}>
        <AvatarImage src={organization?.logo ?? undefined} />
        <AvatarFallback>{organization?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
    ),
    [organization?.logo, organization?.name, styles.avatar]
  );

  if (!organization) return null;

  return (
    <div
      className={cn('flex w-full items-center', styles.container, className)}
    >
      {collapsed ? (
        LogoImage
      ) : (
        <>
          {LogoImage}
          <div className="flex min-w-0 flex-col text-left">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-1 flex-col">
                    <span
                      className={cn('flex-1 truncate', styles.name)}
                      style={{
                        maxWidth: `${titleTruncateLimit}px`,
                      }}
                    >
                      {organization?.name}
                    </span>
                    <span>
                      <MemberRoleBadge
                        size="sm"
                        role={organization?.role ?? 'member'}
                      />
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{organization?.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </>
      )}
    </div>
  );
}
