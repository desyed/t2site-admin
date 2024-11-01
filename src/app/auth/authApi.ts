import { api } from '@/lib/api';

/**
 * @POST /auth/login
 */
export function loginMutation(payload: object) {
  return api.post('/auth/login', payload);
}

/**
 * @POST /auth/signup
 */
export function singupMutation(payload: object) {
  return api.post('/auth/signup', payload);
}

/**
 * @GET /auth/refresh
 */
export function getTokenQuery() {
  return api.get('/auth/refresh');
}

/**
 * @DELETE /auth/logout
 */
export function logoutMutation() {
  return api.delete('/auth/logout');
}

/**
 * @GET /session
 */
export function getSessionQuery() {
  return api.get('/session');
}

/**
 * @GET /session
 */
export function getProfileQuery() {
  return api.get('/profile');
}

/**
 * @POST /send-email-verification
 */
export async function sendEmailVericationMutation() {
  return api.post('/verification/email/send');
}

/**
 * @POST /verify-email
 */
export function verifyEmailMutation(payload: object) {
  return api.post('/verification/email/verify', payload);
}
