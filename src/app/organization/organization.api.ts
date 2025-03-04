import { api } from '@/lib/api';

import type {
  MemberActionPayload,
  UpdateInvitationPayload,
} from './organizaion.type';

/**
 * @GET /session
 */
export function getOrganizationsApi() {
  return api.get('/organizations');
}

/**
 * @GET /organizations/:id
 */
export function getOrganizationApi(id: string) {
  return api.get(`/organizations/${id}`);
}

/**
 * @POST /organizations
 */
export function createOrganizationApi(payload: object) {
  return api.post('/organizations', payload);
}

/**
 * @PUT /organizations/:id
 */
export function updateOrganizationApi(id: string, payload: object) {
  return api.put(`/organizations/${id}`, payload);
}

/**
 * @DELETE /organizations/:id
 */
export function deleteOrganizationApi(id: string) {
  return api.delete(`/organizations/${id}`);
}

/**
 * @PUT /organizations/change-current
 */
export function changeCurrentOrganizationApi(payload: object) {
  return api.put(`/organizations/change-current`, payload);
}

/**
 * @POST /organizations/:id/invite/:organizationId?
 */
export function inviteOrganizationMembersApi(
  payload: object,
  organizationId = ''
) {
  return api.post(`/organizations/invite/${organizationId}`, payload);
}

/**
 * @GET /organizations/invited-members/:organizationId?
 */
export function getInvitedMembersApi<T = unknown>(organizationId = '') {
  return api.get<T>(`/organizations/invited-members/${organizationId}`);
}

/**
 * @PUT /organizations/invite/resend/:invitedMemberId/:organizationId?
 */
export function resendInvitationApi<T = unknown>(
  payload: UpdateInvitationPayload
) {
  return api.put<T>(
    `/organizations/invite/resend/${payload.invitedMemberId}/${payload.organizationId}`
  );
}

/**
 * @DELETE organizations/invite/cancel/:invitedMemberId/:organizationId?
 */
export function cancelInvitationApi<T = unknown>(
  payload: UpdateInvitationPayload
) {
  return api.delete<T>(
    `/organizations/invite/cancel/${payload.invitedMemberId}/${payload.organizationId}`
  );
}

/**
 * @GET /organizations/invitations/:invitedMemberId
 */
export function getInvitedMemberApi(invitedMemberId: string) {
  return api.get(`/organizations/invitations/${invitedMemberId}`);
}

/**
 * @POST /organizations/invitations/:invitedMemberId
 */
export function promptInvitationApi(invitedMemberId: string, payload: object) {
  return api.post(
    `/organizations/invitations/prompt/${invitedMemberId}`,
    payload
  );
}

/**
 * @GET /organizations/members/:organizationId?
 */
export function getOrganizationMembersApi<T = unknown>(organizationId = '') {
  return api.get<T>(`/organizations/members/${organizationId}`);
}

/**
 * @PUT organizations/members/:memberId/change-role/:organizationId?
 */
export function changeMemberRoleApi(payload: MemberActionPayload) {
  return api.put(
    `/organizations/members/${payload.memberId}/change-role/${payload.organizationId ?? ''}`,
    payload.payload
  );
}

/**
 * @DELETE organizations/members/:memberId/:organizationId
 */
export function removeMemberApi(payload: MemberActionPayload) {
  return api.delete(
    `/organizations/members/${payload.memberId}/${payload.organizationId ?? ''}`
  );
}

/**
 * /organizations/leave/:organizationId?
 */
export function leaveOrganizationApi(organizationId = '') {
  return api.delete(`/organizations/leave/${organizationId}`);
}
