import { useMemo } from 'react';

import type { Project } from '@/app/project/project.type';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function ProjectLabel({
  project,
  titleTruncateLimit = 120,
  siteTruncateLimit = 130,
  collapsed = false,
}: {
  project: Project;
  titleTruncateLimit?: number;
  siteTruncateLimit?: number;
  collapsed?: boolean;
}) {
  const LogoImage = useMemo(
    () => (
      <Avatar className="size-6 ">
        <AvatarImage src={project.icon ?? '/project-default.png'} />
        <AvatarFallback>{project.name}</AvatarFallback>
      </Avatar>
    ),
    [project.icon, project.name]
  );
  return (
    <div className="flex items-center gap-1">
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
                    className=" truncate text-sm font-semibold"
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
                    className=" truncate text-xs text-muted-foreground"
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
