import { handleApi } from '@/lib/utils';
import { create } from 'zustand';
import { getSessionQuery, logoutMutation } from './authApi';

export type TAuthUser = {
  authType: string;
  access_token: string;
  id: number;
  avatar: null | string;
  email: string;
  emailVerified: null | string;
  name: string;
};

export type TAuthState = {
  user: TAuthUser | null;
  updateAuthUser: (user: Partial<TAuthUser>) => void;
  setAuthUser: (user: TAuthUser) => void;
  resetAuth: () => void;
  fetchSession: () => Promise<void>;
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  getAccessToken: () => string | null;
  setAuth: (user: TAuthUser, access_token: string) => void;
  logout: () => Promise<void>;
  isLogingOut: boolean;
};

export const useAuthStore = create<TAuthState>((set, get) => ({
  user: null,
  isLogingOut: false,
  accessToken: localStorage.getItem('t2_ac'),
  setAuthUser: (user) => set({ user: user }),
  updateAuthUser: (user) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, ...user }
        : ({ ...user } as TAuthUser),
    })),
  resetAuth: () => {
    set({
      user: null,
      accessToken: null,
    });
    localStorage.removeItem('t2_ac');
  },
  fetchSession: async () => {
    try {
      const { data } = await handleApi(
        getSessionQuery,
        {},
        {
          toast: true,
        }
      );
      if (data?.email) {
        set({ user: data as TAuthUser });
      } else {
        get().logout();
      }
    } catch (err) {}
  },
  setAccessToken: (token: string) => {
    set({
      accessToken: token,
    });
    localStorage.setItem('t2_ac', token);
  },
  getAccessToken: () => {
    return get().accessToken;
  },
  setAuth: (user, accessToken) => {
    localStorage.setItem('t2_ac', accessToken);
    set({
      user,
      accessToken,
    });
  },
  async logout() {
    const { success } = await handleApi(logoutMutation, {}, { toast: true });
    if (success) {
      set({
        isLogingOut: true,
      });
      get().resetAuth();
    }
  },
}));

export const authStore = useAuthStore.getState();
