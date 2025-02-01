import { queryClient } from "@/query-client";
import { fetchInvitedMembers } from "./organization-fetch";
import { invitedMemberQueryKeys } from "./organization-keys";

export async function preFetchInvitedMembers() {
  await queryClient.prefetchQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberList(),
    queryFn: fetchInvitedMembers,
  });
}