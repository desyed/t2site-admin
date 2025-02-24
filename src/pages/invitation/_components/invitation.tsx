import { useInvitedMemberQuery } from "@/app/organization/organization-hooks";
import { AxiosError } from "axios";
import InvitationErrorTemplate from "./invitaion-error-template";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dayJs } from "@/lib/time";
import { Check, X } from "lucide-react";
import { StatusBadge, StatusType } from "@/components/status-badge";

export default function Invitation({ invitedMemberId }: { invitedMemberId: string }) {
  const { data: invitedMember, error, isLoading, isFetching } = useInvitedMemberQuery(invitedMemberId);

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center min-h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary " />
      </div>
    );
  }

  if (error && error instanceof AxiosError) {
    if (error.response?.status === 404) {
      return (
        <InvitationErrorTemplate
          type="warning"
          message="The invitation link you're trying to access is expired or removed. Please contact your administrator to get a new link."
          title="Invitation Link Expired"
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

  const hasExpired = invitedMember.expiresAt && dayJs(invitedMember.expiresAt).isBefore(dayJs());

  return (
    <div >
      <div className="text-center mb-6 sm:mb-8">
        <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4">
          <AvatarImage src={invitedMember?.organization.logo ?? undefined} />
          <AvatarFallback className="text-xl sm:text-2xl">{invitedMember?.organization.name}</AvatarFallback>
        </Avatar>
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">Join {invitedMember?.organization.name}</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          You've been invited to join as a {invitedMember?.role}
        </p>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center p-2 sm:p-3 bg-muted/50 rounded-lg">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
            <AvatarImage src={invitedMember?.invitedBy.avatar ?? undefined} />
            <AvatarFallback>{invitedMember?.invitedBy.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-2 sm:ml-3">
            <p className="font-medium text-xs sm:text-sm">{invitedMember?.invitedBy.name}</p>
            <p className="text-xs text-muted-foreground">{invitedMember?.invitedBy.email}</p>
          </div>
        </div>

        <div className="p-2 sm:p-3 bg-muted/50 rounded-lg text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-y-2">
            <p className="text-muted-foreground">Status</p>
            {hasExpired ? (
              <StatusBadge status="expired" />
            ) : (
              <StatusBadge status={invitedMember?.status as StatusType} />
            )}
            <p className="text-muted-foreground">Expires at</p>
            <p>{invitedMember?.expiresAt && dayJs(invitedMember.expiresAt).format('MMM D, YYYY')}</p>
          </div>
        </div>
      </div>

      {hasExpired ? (
        <div className="mt-5">
          <p className="text-sm text-center text-orange-400/90 p-2 rounded-lg bg-orange-400/10 border border-orange-500/5">
            This invitation has expired. Please contact your administrator to get a new link.
          </p>
        </div>
      ) : <div className="flex gap-2 mt-5">
        <Button className="flex-1" size="sm">
          <Check className="h-3 w-3 sm:h-4 sm:w-4 " />
          Accept
        </Button>
        <Button variant="outline" className="flex-1" size="sm">
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
          Decline
        </Button>
      </div>}
    </div>
  );
}
