import { api } from "@/lib/api";

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

