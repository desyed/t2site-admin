import { authStore } from './auth.store';

export async function authPreSessionLoader() {
  const actSe = localStorage.getItem('t2_ac');
  if (actSe) {
    await authStore.fetchSession();
  }
  return authStore.getSession();
}
