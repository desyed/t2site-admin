import { api } from '@/lib/api';
import { delay } from "@/lib/utils";

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
 * @GET /session
 */
export function getSessionQuery() {
  return api.get('/session');
}

/**
 * @POST /send-email-verification
 */
export async function sendEmailVericationMutation() {
  await delay(1000);
  return api.post('/send-email-verification');
}

/**
 * @POST /verify-email
 */
export function verifyEmailMutation(payload: object) {
  return api.post('/verify-email', payload);
}

/**
 * @DELETE /auth/logout
 */
export function logoutMutation() {
  return api.delete('/auth/logout');
}
