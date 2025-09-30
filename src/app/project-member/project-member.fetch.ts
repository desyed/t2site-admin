import type {
  InvitedMember,
  InvitedMemberResponse,
  ProjectMember,
} from './project-member.type';

import {
  getInvitedMemberApi,
  getInvitedMembersApi,
  getProjectMembersApi,
} from './projecet-memebr.api';

export async function fetchInvitedMembers(projectId: string) {
  const result = (await getInvitedMembersApi(projectId)) as any;
  return result?.data?.data?.invitedMembers as InvitedMember[];
}

export async function fetchInvitedMember(invitedMemberId: string) {
  const result = (await getInvitedMemberApi(invitedMemberId)) as any;
  return result?.data?.data as InvitedMemberResponse;
}

export async function fetchProjectMembers(projectId: string) {
  const result = (await getProjectMembersApi(projectId)) as any;
  return result?.data?.data?.members as ProjectMember[];
}
