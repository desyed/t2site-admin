import { useQueryClient } from '@tanstack/react-query';
import { MoreHorizontal, XIcon, SendIcon, Loader2, BanIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import type { InvitedMember } from '@/app/organization/organizaion-type';

import {
  useResendInvitationMutation,
  useCancelInvitationMutation,
} from '@/app/organization/organization-hooks';
import { invitedMemberQueryKeys } from '@/app/organization/organization-keys';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { delay, handleApiErrorException } from '@/lib/utils';

type InvitedMemberActionsProps = {
  member: InvitedMember;
};

export default function InvitedMemberActions({ member }: InvitedMemberActionsProps) {
  const [showResendDialog, setShowResendDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: resendInvitation, isPending: isResending } = useResendInvitationMutation<{
    data: {
      data: {
        invitedMember: InvitedMember;
      };
    };
  }>();
  const { mutate: cancelInvitation, isPending: isCanceling } = useCancelInvitationMutation<{
    data: {
      data: {
        invitedMember: InvitedMember;
      };
    };
  }>();
  const handleResendInvitation = () => {
    resendInvitation(
      {
        invitedMemberId: member.id,
        organizationId: member.organizationId,
      },
      {
        onSuccess: async ({ data }) => {
          setShowResendDialog(false);
          const memeberEmail = data?.data?.invitedMember?.email;
          const memberRole = data?.data?.invitedMember?.role;
          queryClient.invalidateQueries({ queryKey: invitedMemberQueryKeys.invitedMemberList() });

          await delay(200);
          toast.success('Invitation resent successfully', {
            description: `Invitation resent for ${memeberEmail} with role ${memberRole}`,
          });
        },
        onError: (error) => {
          handleApiErrorException(error, true);
        },
      }
    );
  };

  const handleCancelInvitation = () => {
    cancelInvitation(
      {
        invitedMemberId: member.id,
        organizationId: member.organizationId,
      },
      {
        onSuccess: async ({ data }) => {
          setShowCancelDialog(false);
          const memeberEmail = data?.data?.invitedMember?.email;
          const memberRole = data?.data?.invitedMember?.role;
          queryClient.invalidateQueries({ queryKey: invitedMemberQueryKeys.invitedMemberList() });
          await delay(200);
          toast.success('Invitation removed successfully', {
            description: `Invitation removed for ${memeberEmail} with role ${memberRole}`,
          });
        },
        onError: (error: any) => {
          handleApiErrorException(error, true);
        },
      }
    );
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="[&_svg]:size-4" onSelect={() => setShowResendDialog(true)}>
            <SendIcon className="mr-2" /> Resend invitation
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            onSelect={() => setShowCancelDialog(true)}
          >
            <XIcon className="mr-2 size-4" /> Remove invitation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showResendDialog} onOpenChange={setShowResendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resend Invitation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to resend the invitation to {member.email}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">
                <BanIcon className="size-3 sm:size-4" /> Cancel
              </Button>
            </AlertDialogCancel>
            <Button variant="default" onClick={handleResendInvitation} disabled={isResending}>
              {isResending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <SendIcon className="size-4" />
                  Resend
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Invitation</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel the pending invitation for {member.email}. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">
                <BanIcon className="size-3 sm:size-4" /> Cancel
              </Button>
            </AlertDialogCancel>
            <Button
              variant="destructive"
              className="bg-destructive text-foreground hover:bg-destructive/90"
              onClick={handleCancelInvitation}
            >
              {isCanceling ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Removing...
                </>
              ) : (
                <>
                  <XIcon className="size-4" />
                  Remove Invitation
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
