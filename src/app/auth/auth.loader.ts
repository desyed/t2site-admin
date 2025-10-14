import { authStore } from './auth.store';

export async function authPreSessionLoader() {
  const actSe = authStore.getAccessToken();
  if (actSe) {
    await authStore.fetchSession();
  }
  return authStore.getSession();
}
