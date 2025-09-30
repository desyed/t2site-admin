import { AxiosError } from 'axios';

import type { StatusType } from '@/components/status-badge';

import { useInvitedMemberQuery } from '@/app/team-members/organization.hooks';
import { StatusBadge } from '@/components/status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { dayJs } from '@/lib/time';

import InvitationActions from './invitaion-actions';
import InvitationErrorTemplate from './invitaion-error-template';

export default function Invitation({
  invitedMemberId,
}: {
  invitedMemberId: string;
}) {
  const {
    data: invitedMember,
    error,
    isLoading,
    isFetching,
  } = useInvitedMemberQuery(invitedMemberId);

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-56 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  if (error && error instanceof AxiosError) {
    if (error.response?.status === 404) {
      return (
        <InvitationErrorTemplate
          type="warning"
          message="We couldn't find this invitation. It may have expired or been removed. Please contact your administrator for a new invitation link."
          title="Invitation Not Found"
        />
      );
    }
  }

  if (!invitedMember) {
    return (
      <InvitationErrorTemplate
        title="Invalid Invitation Link"
        type="error"
        message="The invitation link you're trying to access is invalid. Please contact your administrator to get a new link."
      />
    );
  }

  const hasExpired =
    invitedMember.expiresAt && dayJs(invitedMember.expiresAt).isBefore(dayJs());

  return (
    <div>
      <div className="mb-6 text-center sm:mb-8">
        <Avatar className="mx-auto mb-3 size-16 sm:mb-4 sm:size-20">
          <AvatarImage src={invitedMember?.organization.logo ?? undefined} />
          <AvatarFallback className="text-xl sm:text-2xl">
            {invitedMember?.organization.name}
          </AvatarFallback>
        </Avatar>
        <h1 className="mb-2 text-xl font-semibold sm:text-2xl">
          Join {invitedMember?.organization.name}
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          {`You've`} been invited to join as a {invitedMember?.role}
        </p>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center rounded-lg bg-muted/50 p-2 sm:p-3">
          <Avatar className="size-8 sm:size-10">
            <AvatarImage src={invitedMember?.invitedBy.avatar ?? undefined} />
            <AvatarFallback>
              {invitedMember?.invitedBy.name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-2 sm:ml-3">
            <p className="text-xs font-medium sm:text-sm">
              {invitedMember?.invitedBy.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {invitedMember?.invitedBy.email}
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-2 text-xs sm:p-3 sm:text-sm">
          <div className="grid grid-cols-2 gap-y-2">
            <p className="text-muted-foreground">Status</p>
            {hasExpired ? (
              <StatusBadge status="expired" />
            ) : (
              <StatusBadge
                loading={!!invitedMember?.optimisticallyUpdatedAt}
                status={invitedMember?.status as StatusType}
              />
            )}
            <p className="text-muted-foreground">Expires at</p>
            <p>
              {invitedMember?.expiresAt &&
                dayJs(invitedMember.expiresAt).format('MMM D, YYYY h:mm A')}
            </p>
          </div>
        </div>
      </div>

      {hasExpired ? (
        <div className="mt-5">
          <p className="rounded-lg border border-orange-500/5 bg-orange-400/10 p-2 text-center text-sm text-orange-400/90">
            This invitation has expired. Please contact your administrator to
            get a new link.
          </p>
        </div>
      ) : (
        <InvitationActions invitedMember={invitedMember} />
      )}
    </div>
  );
}
