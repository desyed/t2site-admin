import type { InvitedMember, InvitedMemberResponse, OrganizationMember } from './organizaion-type';

import {
  getInvitedMemberApi,
  getInvitedMembersApi,
  getOrganizationMembersApi,
} from './organization-api';

export async function fetchInvitedMembers() {
  const result = await getInvitedMembersApi();
  return result?.data?.data?.invitedMembers as InvitedMember[];
}

export async function fetchInvitedMember(invitedMemberId: string) {
  const result = await getInvitedMemberApi(invitedMemberId);
  return result?.data?.data as InvitedMemberResponse;
}

export async function fetchOrganizationMembers(organizationId?: string) {
  const result = await getOrganizationMembersApi(organizationId);
  return result?.data?.data?.members as OrganizationMember[];
}
