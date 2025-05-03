import { queryClient } from '@/query-client';

import {
  fetchInvitedMember,
  fetchInvitedMembers,
  fetchOrganizationMembers,
} from './organization.fetch';
import { invitedMemberQueryKeys, memberQueryKeys } from './organization.keys';

export async function preFetchInvitedMembers() {
  await queryClient.prefetchQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberList(),
    queryFn: fetchInvitedMembers,
  });
}

export async function preFetchInvitedMember(invitedMemberId: string) {
  return await queryClient.prefetchQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberDetails(invitedMemberId),
    queryFn: ({ queryKey }) => fetchInvitedMember(queryKey[1] ?? ''),
    retry: false,
  });
}

export async function preFetchOrganizationMembers() {
  return await queryClient.prefetchQuery({
    queryKey: memberQueryKeys.memberList(),
    queryFn: () => fetchOrganizationMembers(),
  });
}
