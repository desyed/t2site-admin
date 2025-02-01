import { useMutation, useQuery } from "@tanstack/react-query";
import { inviteOrganizationMembersApi } from "./organization-api";
import { InviteMemberInput } from "./organizaion-type";
import { fetchInvitedMembers } from "./organization-fetch";
import { invitedMemberQueryKeys } from "./organization-keys";

export function useInviteMembersQuery() {
  const query = useQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberList(),
    queryFn: fetchInvitedMembers,
  })
  return query;
}

export function useInviteMembersMutaion() {
  const mutation = useMutation({
    mutationFn: (payload: InviteMemberInput) => {
      return inviteOrganizationMembersApi(payload);
    },
  });
  return mutation;
}
