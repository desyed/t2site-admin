import { useMemo } from 'react';

import type { Organization } from '@/app/organization/organizaion.type';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function OrganizationLabel({
  organization,
  titleTruncateLimit = 120,
  collapsed = false,
}: {
  organization: Organization;
  titleTruncateLimit?: number;
  collapsed?: boolean;
}) {
  const LogoImage = useMemo(
    () => (
      <Avatar className="size-6 bg-muted">
        <AvatarImage src={organization?.logo ?? undefined} />
        <AvatarFallback>{organization?.name}</AvatarFallback>
      </Avatar>
    ),
    [organization?.logo, organization?.name]
  );
  if (!organization) return null;
  return (
    <div className="flex w-full items-center gap-2">
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
                    {organization?.name}
                  </span>
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
