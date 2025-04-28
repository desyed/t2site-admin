import type {
  InvitedMember,
  InvitedMemberResponse,
  OrganizationMember,
} from './organizaion.type';

import {
  getInvitedMemberApi,
  getInvitedMembersApi,
  getOrganizationMembersApi,
} from './organization.api';

export async function fetchInvitedMembers() {
  const result = (await getInvitedMembersApi()) as any;
  return result?.data?.data?.invitedMembers as InvitedMember[];
}

export async function fetchInvitedMember(invitedMemberId: string) {
  const result = (await getInvitedMemberApi(invitedMemberId)) as any;
  return result?.data?.data as InvitedMemberResponse;
}

export async function fetchOrganizationMembers(organizationId?: string) {
  const result = (await getOrganizationMembersApi(organizationId)) as any;
  return result?.data?.data?.members as OrganizationMember[];
}
