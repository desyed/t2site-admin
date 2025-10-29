import { MoreHorizontal, XIcon, SendIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import type { InvitedMember } from '@/app/project-member/project-member.type';
import type { Project } from '@/app/project/project.type';

import {
  useResendInvitationMutation,
  useRemoveInvitationMutation,
} from '@/app/project-member/project-member.hooks';
import {
  checkSendInvitationPermission,
  checkCancelInvitationPermission,
} from '@/app/project-member/project-member.service';
import SiteAlertDialog from '@/components/site-alert-dialog';
import { Button } from '@/components/site-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { handleApiErrorException } from '@/lib/utils';

type InvitedMemberActionsProps = {
  member: InvitedMember;
  currentProject: Project;
};

export default function InvitedMemberActions({
  member,
  currentProject,
}: InvitedMemberActionsProps) {
  const hasSendInvitationPermission = checkSendInvitationPermission(
    currentProject?.currentUser?.role,
    member.role
  );
  const hasCancelInvitationPermission = checkCancelInvitationPermission(
    currentProject?.currentUser?.role,
    member.role
  );

  const [showResendDialog, setShowResendDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const { mutate: resendInvitation, isPending: isResending } =
    useResendInvitationMutation<{
      data: {
        data: {
          invitedMember: InvitedMember;
        };
      };
    }>();
  const { mutate: cancelInvitation, isPending: isCanceling } =
    useRemoveInvitationMutation<{
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
        projectId: currentProject.id,
      },
      {
        onSuccess: async ({ data }) => {
          setShowResendDialog(false);
          const memeberEmail = data?.data?.invitedMember?.email;
          const memberRole = data?.data?.invitedMember?.role;
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
        projectId: currentProject.id,
      },
      {
        onSuccess: async ({ data }) => {
          setShowCancelDialog(false);
          const memeberEmail = data?.data?.invitedMember?.email;
          const memberRole = data?.data?.invitedMember?.role;
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
          <Button variant="ghost" className="size-6 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {hasSendInvitationPermission && (
            <DropdownMenuItem
              className="[&_svg]:size-4"
              onSelect={() => setShowResendDialog(true)}
            >
              <SendIcon className="mr-2" /> Resend invitation
            </DropdownMenuItem>
          )}
          {hasCancelInvitationPermission && (
            <DropdownMenuItem
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
              onSelect={() => setShowCancelDialog(true)}
            >
              <XIcon className="mr-2 size-4" /> Remove invitation
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {hasSendInvitationPermission && (
        <SiteAlertDialog
          open={showResendDialog}
          loading={isResending}
          loadingText="Resending..."
          setOpen={setShowResendDialog}
          title="Resend Invitation"
          description={`This will resend the invitation for ${member.email}. This action cannot be
            undone.`}
          onConfirm={handleResendInvitation}
          confirmText={<>Resend</>}
          confirmIcon={<SendIcon className="size-4" />}
        />
      )}
      {hasCancelInvitationPermission && (
        <SiteAlertDialog
          open={showCancelDialog}
          loading={isCanceling}
          loadingText="Removing..."
          setOpen={setShowCancelDialog}
          isDanger={true}
          title="Remove Invitation"
          description={`This will remove the pending invitation for ${member.email}. This action cannot be
            undone.`}
          onConfirm={handleCancelInvitation}
          confirmText={<>Remove</>}
          confirmIcon={<XIcon className="size-4" />}
        />
      )}
    </>
  );
}
