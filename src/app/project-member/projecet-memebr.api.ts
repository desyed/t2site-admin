import { api } from '@/lib/api';

import type {
  MemberActionPayload,
  UpdateInvitationPayload,
  InviteMemberInput,
} from './project-member.type';

/**
 * @POST /projects/:projectId/invited-members
 */
export function inviteProjectMembersApi(payload: InviteMemberInput) {
  return api.post(`/projects/${payload.projectId}/invited-members`, payload);
}

/**
 * @GET /organizations/invited-members/:organizationId?
 */
export function getInvitedMembersApi<T = unknown>(projectId: string) {
  return api.get<T>(`/projects/${projectId}/invited-members`);
}

/**
 * @PUT /projects/:projectId/invited-members/:invitedMemberId/resend
 */
export function resendInvitationApi<T = unknown>(
  payload: UpdateInvitationPayload
) {
  return api.put<T>(
    `/projects/${payload.projectId}/invited-members/${payload.invitedMemberId}/resend`
  );
}

/**
 * @DELETE projects/:projectId/invited-members/:invitedMemberId
 */
export function removeInvitationApi<T = unknown>(
  payload: UpdateInvitationPayload
) {
  return api.delete<T>(
    `/projects/${payload.projectId}/invited-members/${payload.invitedMemberId}`
  );
}

/**
 * @GET /projects/invitations/:invitedMemberId
 */
export function getInvitedMemberApi(invitedMemberId: string) {
  return api.get(`/projects/invitations/${invitedMemberId}`);
}

/**
 * @POST /projects/invitations/:invitedMemberId/prompt
 */
export function promptInvitationApi(
  invitedMemberId: string,
  payload: {
    promptType: 'accept' | 'reject';
  }
) {
  return api.post(`/projects/invitations/${invitedMemberId}/prompt`, payload);
}

/**
 * @GET /projects/:projectId/members
 */
export function getProjectMembersApi<T = unknown>(projectId = '') {
  return api.get<T>(`projects/${projectId}/members`);
}

/**
 * @PUT projects/members/:memberId/change-role/:projectId?
 */
export function changeMemberRoleApi(payload: MemberActionPayload) {
  return api.put(
    `/projects/${payload.projectId}/members/${payload.memberId}/change-role`,
    payload.payload
  );
}

/**
 * @DELETE projects/members/:memberId/:projectId
 */
export function removeMemberApi(payload: MemberActionPayload) {
  return api.delete(
    `/projects/${payload.projectId}/members/${payload.memberId}`
  );
}

/**
 * /projects/:projectId/leave
 */
export function leaveProjectApi(projectId: string) {
  return api.delete(`/projects/${projectId}/leave`);
}
