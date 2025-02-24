import { queryClient } from "@/query-client";
import { fetchInvitedMember, fetchInvitedMembers } from "./organization-fetch";
import { invitedMemberQueryKeys } from "./organization-keys";


export async function preFetchInvitedMembers() {
  await queryClient.prefetchQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberList(),
    queryFn: fetchInvitedMembers,
  });
}

export async function preFetchInvitedMember(invitedMemberId: string) {
  return await queryClient.prefetchQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberDetails(invitedMemberId),
    queryFn: ({ queryKey }) => fetchInvitedMember(queryKey[1]),
    retry: false,
  });
}

