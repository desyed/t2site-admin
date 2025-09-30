import { ChevronsUpDown } from 'lucide-react';
import { forwardRef } from 'react';

import type { Organization } from '@/app/project-member/project-member.type';

import { useAuthStore } from '@/app/auth/auth.store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import OrganizationLabel from '../organization-label';

const CurrentOrganizationLabel = forwardRef<
  HTMLButtonElement,
  { handleToggle: () => void }
>(({ handleToggle }, ref) => {
  const currentOrganization = useAuthStore(
    (state) => state.userOrganization?.currentOrganization
  );

  return (
    <Button
      ref={ref}
      variant="outline"
      className={cn(
        'h-10 w-full items-center justify-between rounded-xl px-2 sm:px-3'
      )}
      onClick={handleToggle}
    >
      <div className="flex items-center gap-2">
        <OrganizationLabel
          organization={currentOrganization as unknown as Organization}
          size="sm"
          titleTruncateLimit={80}
        />
      </div>
      <ChevronsUpDown className="ml-auto size-4 opacity-70" />
    </Button>
  );
});

// Set display name for debugging
CurrentOrganizationLabel.displayName = 'CurrentOrganizationLabel';

export default CurrentOrganizationLabel;
