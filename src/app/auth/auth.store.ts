import { create } from 'zustand';

import { handleApi } from '@/lib/utils';

import { getSessionApi, logoutApi } from './auth.api';

export type TAuthUser = {
  authType: string;
  id: string;
  avatar: null | string;
  email: string;
  emailVerified: null | string;
  name: string;
};

export type TSession = {
  userAgent: string;
  expiresAt: string;
};

export type TAuthState = {
  user: TAuthUser | null;
  accessToken: string | null;
  // User methods
  getAuthUser: () => TAuthUser | null;
  getSession: () => {
    user: TAuthUser | null;
    session: TSession | null;
  };

  // User methods
  setAuthUser: (user: TAuthUser) => void;
  updateAuthUser: (user: Partial<TAuthUser>) => void;

  // Token methods
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;

  session: TSession | null;

  setAuth: (user: TAuthUser, access_token: string) => void;
  fetchSession: (refetch?: boolean) => Promise<void>;
  resetAuth: () => void;
  logout: () => Promise<void>;
};

// Store implementation
export const useAuthStore = create<TAuthState>((set, get) => ({
  // Initial state
  user: null,
  accessToken: localStorage.getItem('t2_ac'),
  session: null,

  // User methods
  getAuthUser: () => get().user,
  setAuthUser: (user) => set({ user }),
  updateAuthUser: (user) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, ...user }
        : ({ ...user } as TAuthUser),
    })),

  // Token methods
  getAccessToken: () => get().accessToken,
  setAccessToken: (token: string) => {
    set({ accessToken: token });
    localStorage.setItem('t2_ac', token);
  },

  getSession: () => {
    return {
      user: get().user,
      session: get().session,
    };
  },

  // Auth flow methods
  setAuth: (user, accessToken) => {
    localStorage.setItem('t2_ac', accessToken);
    set({ user, accessToken });
  },

  fetchSession: async (refetch = false) => {
    if (!get().user || refetch) {
      try {
        const { data } = await handleApi(getSessionApi, {}, { toast: true });

        if (data?.user) {
          localStorage.setItem('t2_ac', data.access_token);
          set({
            user: data.user as TAuthUser,
            session: {
              userAgent: data.userAgent,
              expiresAt: data.expiresAt,
            },
          });
        } else {
          get().logout();
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  },

  resetAuth: () => {
    set({
      user: null,
      accessToken: null,
      session: null,
    });
    localStorage.removeItem('t2_ac');
  },

  logout: async () => {
    const { success } = await handleApi(logoutApi, {}, { toast: true });
    if (success) {
      localStorage.removeItem('redirect_to');
      get().resetAuth();
    }
  },
}));

export const authStore = useAuthStore.getState();
