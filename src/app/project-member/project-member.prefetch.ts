import { queryClient } from '@/query-client';

import {
  fetchInvitedMember,
  fetchInvitedMembers,
  fetchProjectMembers,
} from './project-member.fetch';
import { invitedMemberQueryKeys, memberQueryKeys } from './project-member.keys';

export async function preFetchInvitedMembers(projectId: string) {
  await queryClient.prefetchQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberList(projectId),
    queryFn: () => fetchInvitedMembers(projectId),
  });
}

export async function preFetchInvitedMember(invitedMemberId: string) {
  return await queryClient.prefetchQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberDetails(invitedMemberId),
    queryFn: () => fetchInvitedMember(invitedMemberId),
    retry: false,
  });
}

export async function preFetchProjectMembers(projectId: string) {
  return await queryClient.prefetchQuery({
    queryKey: memberQueryKeys.memberList(projectId),
    queryFn: () => fetchProjectMembers(projectId),
  });
}
