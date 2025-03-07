import { useMemo } from 'react';

import type { Project } from '@/app/project/project.type';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
export default function ProjectLabel({
  project,
  titleTruncateLimit = 120,
  siteTruncateLimit = 130,
  collapsed = false,
  iconClassName = '',
  labelClassName = '',
  siteUrlClassName = '',
}: {
  project: Project;
  titleTruncateLimit?: number;
  siteTruncateLimit?: number;
  collapsed?: boolean;
  iconClassName?: string;
  labelClassName?: string;
  siteUrlClassName?: string;
}) {
  const LogoImage = useMemo(
    () => (
      <Avatar className={cn('size-6 bg-muted', iconClassName)}>
        <AvatarImage src={project.icon ?? undefined} />
        <AvatarFallback>{project.name}</AvatarFallback>
      </Avatar>
    ),
    [project.icon, project.name, iconClassName]
  );
  return (
    <div className="flex items-center gap-2">
      {collapsed ? (
        LogoImage
      ) : (
        <>
          {LogoImage}
          <div className="flex min-w-0 flex-col text-left">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={cn(
                      ' truncate text-sm font-semibold',
                      labelClassName
                    )}
                    style={{
                      maxWidth: `${titleTruncateLimit}px`,
                    }}
                  >
                    {project.name}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{project.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={cn(
                      ' truncate text-xs text-muted-foreground',
                      siteUrlClassName
                    )}
                    style={{
                      maxWidth: `${siteTruncateLimit}px`,
                    }}
                  >
                    {project.siteUrl}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{project.siteUrl}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </>
      )}
    </div>
  );
}
