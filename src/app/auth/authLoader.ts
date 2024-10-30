import { authStore } from './authStore';

export async function authPreSessionLoader() {
  const actSe = localStorage.getItem('t2_ac');
  if (actSe) {
    await authStore.fetchSession();
  }
  return [];
}
