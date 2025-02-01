import { api } from '@/lib/api';

/**
 * @POST /auth/login
 */
export function loginApi(payload: object) {
  return api.post('/auth/login', payload);
}

/**
 * @POST /auth/signup
 */
export function singupApi(payload: object) {
  return api.post('/auth/signup', payload);
}

/**
 * @GET /auth/refresh
 */
export function getTokenApi() {
  return api.get('/auth/refresh');
}

/**
 * @DELETE /auth/logout
 */
export function logoutApi() {
  return api.delete('/auth/logout');
}

/**
 * @GET /session
 */
export function getSessionApi() {
  return api.get('/session');
}

/**
 * @GET /session
 */
export function getProfileApi() {
  return api.get('/profile');
}

/**
 * @POST /send-email-verification
 */
export async function sendEmailVericationApi() {
  return api.post('/verification/email/send');
}

/**
 * @POST /verify-email
 */
export function verifyEmailApi(payload: object) {
  return api.post('/verification/email/verify', payload);
}
