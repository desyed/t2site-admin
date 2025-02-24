import { useMutation, useQuery } from "@tanstack/react-query";
import { inviteOrganizationMembersApi, resendInvitationApi, cancelInvitationApi } from "./organization-api";
import { InviteMemberInput, UpdateInvitationPayload } from "./organizaion-type";
import { fetchInvitedMember, fetchInvitedMembers } from "./organization-fetch";
import { invitedMemberQueryKeys } from "./organization-keys";
import { UseMutationOptions } from "@tanstack/react-query";


export function useInviteMembersQuery() {
  const query = useQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberList(),
    queryFn: fetchInvitedMembers,
  })
  return query;
}

export function useInvitedMemberQuery(invitedMemberId: string) {
  const query = useQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberDetails(invitedMemberId),
    queryFn: ({ queryKey }) => fetchInvitedMember(queryKey[1]),
    retry: 1,
    staleTime: 0,
  })
  return query;
}

export function useInviteMembersMutaion(options?: UseMutationOptions<any, any, InviteMemberInput>) {
  const mutation = useMutation({
    mutationFn: (payload: InviteMemberInput) => {
      return inviteOrganizationMembersApi(payload);
    },
    ...options,
  });
  return mutation;
}

export function useResendInvitationMutation(options?: UseMutationOptions<any, any, {
  organizationId: string;
  memberId: string;
}>) {
  const mutation = useMutation({
    mutationFn: (payload: UpdateInvitationPayload) => {
      return resendInvitationApi(payload);
    },
    ...options,
  });
  return mutation;
}

export function useCancelInvitationMutation(options?: UseMutationOptions<any, any, {
  memberId: string;
  organizationId: string;
}>) {
  const mutation = useMutation({
    mutationFn: (payload: UpdateInvitationPayload) => {
      return cancelInvitationApi(payload);
    },
    ...options,
  });
  return mutation;
}


// export function useRejectedInvitationMutation(options?: UseMutationOptions<any, any>) {
//   const mutation = useMutation({
//     mutationFn: (payload: {
//       invitedMemberId: string;
//     }) => {
//       return promptInvitationApi(invitedMemberId: payload.invitedMemberId, {
//         promptType: "reject",
//       });
//     },
//     ...options,
//   });
//   return mutation;
// }

