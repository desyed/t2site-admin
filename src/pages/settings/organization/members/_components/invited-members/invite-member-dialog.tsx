'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PlusIcon, UserIcon, ShieldIcon, CrownIcon, InfoIcon } from 'lucide-react';
import { forwardRef } from 'react';
import { useState } from 'react';

import { useAuthStore } from '@/app/auth/auth-store';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

import { InviteMemberForm } from './invite-member-form';
function RolePermissions() {
  return (
    <div className="mt-2 sm:items-start">
      <p className="mb-1 font-semibold">Role permissions:</p>
      <ul className=" space-y-1 sm:items-start">
        <li className="text-ce flex items-start gap-2">
          <UserIcon className="mt-1 size-4 text-primary" />
          <span>
            <span className="font-semibold">Members</span> can only invite new Members.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <ShieldIcon className="mt-1 size-4 text-primary" />
          <span>
            <b className="font-semibold">Admins</b> can invite Admins or Members.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <CrownIcon className="mt-1 size-4 text-primary" />
          <span>
            <b className="font-semibold">Owners</b> can invite any role.
          </span>
        </li>
      </ul>
    </div>
  );
}

export type InviteMemberDialogProps = {
  openFromParent?: boolean;
  setOpenFromParent?: (open: boolean) => void;
};

const InviteMemberDialog = forwardRef<HTMLDivElement, InviteMemberDialogProps>(
  ({ openFromParent, setOpenFromParent }, ref) => {
    const userOrganizations = useAuthStore((state) => state.userOrganization);

    const isMobile = useIsMobile();

    const [open, setOpen] = useState(false);

    const handleCloseDialog = () => {
      setOpen(false);
    };

    const instrauction = (
      <p>
        Invite others to your organization to collaborate together. An invite is specific to an
        email address and expires after 3 days. Name can be provided for the team {`member's`}{' '}
        convenience.
      </p>
    );

    return (
      <div ref={ref}>
        <Dialog open={openFromParent ?? open} onOpenChange={setOpenFromParent ?? setOpen}>
          {openFromParent === undefined ? (
            <DialogTrigger asChild>
              <Button size="sm" id="invite-member-trigger">
                <PlusIcon className="mr-1 size-4" />
                Invite team member
              </Button>
            </DialogTrigger>
          ) : null}
          <DialogContent className="p-0 sm:max-w-[920px]">
            <DialogHeader className="px-5 pt-5">
              <DialogTitle className="mb-1 text-xl">
                Invite others to{' '}
                <span className="text-primary/90">
                  {userOrganizations?.currentOrganization?.name}
                </span>
                {isMobile && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size="icon" variant="ghost" className="[&_svg]:text-primary/90">
                        <InfoIcon className="size-4" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      {instrauction}
                      <RolePermissions />
                    </PopoverContent>
                  </Popover>
                )}
              </DialogTitle>
              {!isMobile && (
                <>
                  <DialogDescription className="pb-1 text-base ">{instrauction}</DialogDescription>
                  <RolePermissions />
                </>
              )}
            </DialogHeader>
            <InviteMemberForm onClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);

InviteMemberDialog.displayName = 'InviteMemberDialog';

export default InviteMemberDialog;
