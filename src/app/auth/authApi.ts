import { api } from '@/lib/api';

/**
 * @POST /auth/login
 */
export function loginMutaion() {
  return api.get('/auth/login');
}

/**
 * @POST /auth/signup
 */
export function singupMutaion(payload: object) {
  return api.post('/auth/signup', payload);
}

/**
 * @get /auth/refresh
 */
export function getTokenQuery() {
  return api.get('/auth/refresh');
}

/**
 * @GET /session
 */
export function getSessionQuery() {
  return api.get('/session');
}

/**
 * @DELETE /auth/logout
 */
export function logoutMutaion() {
  return api.delete('/auth/logout');
}
