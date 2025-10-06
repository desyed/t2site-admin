import { api } from '@/lib/api';

import type {
  MemberActionPayload,
  UpdateInvitationPayload,
  InviteMemberInput,
} from './project-member.type';

export function inviteProjectMembersApi(payload: InviteMemberInput) {
  return api.post(`/projects/${payload.projectId}/invited-members`, payload);
}

export function getInvitedMembersApi<T = unknown>(projectId: string) {
  return api.get<T>(`/projects/${projectId}/invited-members`);
}

export function resendInvitationApi<T = unknown>(
  payload: UpdateInvitationPayload
) {
  return api.put<T>(
    `/projects/${payload.projectId}/invited-members/${payload.invitedMemberId}/resend`
  );
}

export function removeInvitationApi<T = unknown>(
  payload: UpdateInvitationPayload
) {
  return api.delete<T>(
    `/projects/${payload.projectId}/invited-members/${payload.invitedMemberId}`
  );
}

export function getInvitedMemberApi(invitedMemberId: string) {
  return api.get(`/projects/invitations/${invitedMemberId}`);
}

export function promptInvitationApi(
  invitedMemberId: string,
  payload: {
    promptType: 'accept' | 'reject';
  }
) {
  return api.post(`/projects/invitations/${invitedMemberId}/prompt`, payload);
}

export function getProjectMembersApi<T = unknown>(projectId = '') {
  return api.get<T>(`projects/${projectId}/members`);
}

export function changeMemberRoleApi(payload: MemberActionPayload) {
  return api.put(
    `/projects/${payload.projectId}/members/${payload.memberId}/change-role`,
    payload.payload
  );
}

export function removeMemberApi(payload: MemberActionPayload) {
  return api.delete(
    `/projects/${payload.projectId}/members/${payload.memberId}`
  );
}

export function leaveProjectApi(projectId: string) {
  return api.delete(`/projects/${projectId}/leave`);
}
