import { Check, X } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import type { InvitedMember } from '@/app/organization/organizaion-type';

import { useOptimisticInvitationPromptMutation } from '@/app/organization/organization-hooks';
import { Button } from '@/components/ui/button';
type InvitationActionsProps = {
  invitedMember: InvitedMember;
};

export default function InvitationActions({ invitedMember }: InvitationActionsProps) {
  const navigate = useNavigate();
  const { mutate: invitePrompt, isSuccess } = useOptimisticInvitationPromptMutation();

  const handleDeclineInvitation = () => {
    invitePrompt({
      invitedMemberId: invitedMember.id,
      organizationId: invitedMember.organizationId,
      promptType: 'reject',
    });
  };

  const handleAcceptInvitation = () => {
    invitePrompt({
      invitedMemberId: invitedMember.id,
      organizationId: invitedMember.organizationId,
      promptType: 'accept',
    });
  };

  useEffect(() => {
    if (
      isSuccess &&
      invitedMember.status === 'accepted' &&
      !invitedMember?.optimisticallyUpdatedAt
    ) {
      setTimeout(() => {
        navigate(`/auth?ocr=true&rp=/settings/organization/members`, { replace: true });
      }, 1000);
    }
  }, [isSuccess, invitedMember, navigate]);

  if (invitedMember.status === 'pending') {
    return (
      <div className="mt-5 flex gap-2">
        <Button onClick={handleAcceptInvitation} className="flex-1" size="sm">
          <Check className="size-3 sm:size-4 " />
          Accept
        </Button>

        <Button onClick={handleDeclineInvitation} variant="outline" className="flex-1" size="sm">
          <X className="size-3 sm:size-4" />
          Decline
        </Button>
      </div>
    );
  }

  if (invitedMember.status === 'rejected') {
    return (
      <div className="mt-5 flex flex-col items-center justify-center gap-2">
        <div className="flex gap-2">
          <p className="rounded-lg border border-orange-500/5 bg-orange-400/10 p-2 text-center text-sm text-orange-400/90">
            You have rejected the invitation.
          </p>
          {!invitedMember?.optimisticallyUpdatedAt && (
            <Button variant="outline" onClick={handleAcceptInvitation} size="sm">
              <Check className="size-3 sm:size-4 " />
              Accept
            </Button>
          )}
        </div>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          You can accept the invitation again if you change your mind.
        </p>
      </div>
    );
  }

  if (invitedMember.status === 'accepted') {
    return (
      <div className="mt-5 flex flex-col items-center justify-center gap-2">
        <p className="rounded-lg border border-green-500/5 bg-green-400/10 p-2 text-center text-sm text-green-400/90">
          You have accepted the invitation.
        </p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          You are sortly redirected to the organization.
        </p>
      </div>
    );
  }
}
