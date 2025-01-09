import { api } from "@/lib/api";

/**
 * @GET /session
 */
export function getOrganizationsQuery() {
  return api.get('/organizations');
}


/**
 * @GET /organizations/:id
 */
export function getOrganizationQuery(id: string) {
  return api.get(`/organizations/${id}`);
}

/**
 * @POST /organizations
 */
export function createOrganizationMutation(payload: object) {
  return api.post('/organizations', payload);
}

/**
 * @PUT /organizations/change-current
 */
export function changeCurrentOrganizationMutation(payload: object) {
  return api.put(`/organizations/change-current`, payload);
}

/**
 * @POST /organizations/:id/leave
 */
export function leaveOrganizationMutation(id: string) {
  return api.post(`/organizations/${id}/leave`);
}

/**
 * @POST /organizations/:id/invite
 */
export function inviteOrganizationMutation(id: string, payload: object) {
  return api.post(`/organizations/${id}/invite`, payload);
}

/**
 * @POST /organizations/:id/join
 */
export function joinOrganizationMutation(id: string, payload: object) {
  return api.post(`/organizations/${id}/join`, payload);
}

/**
 * @PUT /organizations/:id
 */
export function updateOrganizationMutation(id: string, payload: object) {
  return api.put(`/organizations/${id}`, payload);
}

/**
 * @DELETE /organizations/:id
 */
export function deleteOrganizationMutation(id: string) {
  return api.delete(`/organizations/${id}`);
}

