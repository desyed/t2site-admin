import { create } from 'zustand';

import { handleApi } from '@/lib/utils';

import { getSessionApi, logoutApi } from './auth-api';

// Types
export type TOrganization = {
  role: 'admin' | 'member' | 'owner';
  id: number;
  name: string;
  slug: string;
  logo: string | null;
};

export type TAuthUser = {
  authType: string;
  id: number;
  avatar: null | string;
  email: string;
  currentOrganizationId: string | null;
  emailVerified: null | string;
  name: string;
};

export type TUserOrganization = {
  organizations: TOrganization[];
  currentOrganization: TOrganization | null;
};

export type TAuthState = {
  // State properties
  user: TAuthUser | null;
  accessToken: string | null;
  userOrganization: TUserOrganization | null;

  // User methods
  getAuthUser: () => TAuthUser | null;
  setAuthUser: (user: TAuthUser) => void;
  updateAuthUser: (user: Partial<TAuthUser>) => void;

  // Token methods
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;

  // Organization methods
  setUserOrganization: (userOrganization: TUserOrganization) => void;

  // Auth flow methods
  setAuth: (user: TAuthUser, access_token: string) => void;
  fetchSession: (refetch?: boolean) => Promise<void>;
  resetAuth: () => void;
  logout: () => Promise<void>;
};

// Store implementation
export const useAuthStore = create<TAuthState>((set, get) => ({
  // Initial state
  user: null,
  userOrganization: null,
  accessToken: localStorage.getItem('t2_ac'),

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

  // Organization methods
  setUserOrganization: (userOrganization: TUserOrganization) =>
    set({ userOrganization }),

  // Auth flow methods
  setAuth: (user, accessToken) => {
    localStorage.setItem('t2_ac', accessToken);
    set({ user, accessToken });
  },

  fetchSession: async (refetch = false) => {
    if (!get().user || refetch) {
      try {
        const { data } = await handleApi(
          getSessionApi,
          {},
          { toast: true }
        );

        if (data?.user) {
          set({
            user: data.user as TAuthUser,
            userOrganization: data.userOrganization as TUserOrganization
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
    });
    localStorage.removeItem('t2_ac');
  },

  logout: async () => {
    const { success } = await handleApi(logoutApi, {}, { toast: true });
    if (success) {
      get().resetAuth();
    }
  },
}));

export const authStore = useAuthStore.getState();
