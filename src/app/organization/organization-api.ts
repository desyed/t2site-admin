import { api } from "@/lib/api";
import { UpdateInvitationPayload } from "./organizaion-type";

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
 * @PUT /organizations/change-current
 */
export function changeCurrentOrganizationApi(payload: object) {
  return api.put(`/organizations/change-current`, payload);
}

/**
 * @POST /organizations/:id/leave
 */
export function leaveOrganizationApi(id: string) {
  return api.post(`/organizations/${id}/leave`);
}

/**
 * @POST /organizations/:id/invite/:organizationId?
 */
export function inviteOrganizationMembersApi(payload: object, organizationId = '') {
  return api.post(`/organizations/invite/${organizationId}`, payload);
}

/**
 * @GET /organizations/invited-members/:organizationId?
 */
export function getInvitedMembersApi<T = any>(organizationId = '') {
  return api.get<T>(`/organizations/invited-members/${organizationId}`);
}

/**
 * @PUT /organizations/invite/resend/:memberId/:organizationId?
 */
export function resendInvitationApi<T = any>(payload: UpdateInvitationPayload) {
  return api.put<T>(`/organizations/invite/resend/${payload.memberId}/${payload.organizationId}`);
}

/**
 * @DELETE organizations/invite/cancel/:memberId/:organizationId?
 */
export function cancelInvitationApi<T = any>(payload: UpdateInvitationPayload) {
  return api.delete<T>(`/organizations/invite/cancel/${payload.memberId}/${payload.organizationId}`);
}

/**
 * @GET /organizations/invitations/:invitedId
 */
export function getInvitedMemberApi(invitedId: string) {
  return api.get(`/organizations/invitations/${invitedId}`);
}

/**
 * @POST /organizations/:id/join
 */
export function joinOrganizationApi(id: string, payload: object) {
  return api.post(`/organizations/${id}/join`, payload);
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

