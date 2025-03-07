import { Plus } from 'lucide-react';
import { useState } from 'react';

import { useAuthStore } from '@/app/auth/auth.store';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

import { CreateOrganizationDialog } from '../create-organization-dialog';
import OrganizationPopoverItem from './organization-popover-item';
export default function OrganizationPopoverContent({
  closePopover,
}: {
  closePopover: () => void;
}) {
  const [createOrganizationDialogOpen, setCreateOrganizationDialogOpen] =
    useState(false);
  const organizations = useAuthStore(
    (state) => state.userOrganization?.organizations
  );

  return (
    <>
      <Command className="z-50 rounded-lg border shadow-md md:min-w-[300px]">
        <div className="border-b px-3 py-2">
          <h2 className="text-sm font-semibold">Organizations</h2>
        </div>
        <CommandInput className="h-9" placeholder="Search organizations..." />
        <CommandList>
          <CommandEmpty>No organizations found.</CommandEmpty>
          <CommandGroup className="site-scrollbar max-h-[255px] min-h-[100px] overflow-y-auto p-1">
            {organizations?.map((organization) => {
              return (
                <OrganizationPopoverItem
                  key={organization.id}
                  organization={organization}
                  closePopover={closePopover}
                />
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <div className="p-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-full"
              onClick={() => {
                setCreateOrganizationDialogOpen(true);
              }}
            >
              <Plus className="mr-2 size-4" />
              New Organization
            </Button>
          </div>
        </CommandList>
      </Command>

      <CreateOrganizationDialog
        openFromParent={createOrganizationDialogOpen}
        setOpenFromParent={setCreateOrganizationDialogOpen}
      />
    </>
  );
}
