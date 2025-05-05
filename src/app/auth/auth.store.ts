import { create } from 'zustand';

import type { TService } from '@/app/project/project.type';
import type { RoleName } from '@/constants/roles';

import { handleApi } from '@/lib/utils';

import { getSessionApi, logoutApi } from './auth.api';

// Types
export type TOrganization = {
  role: RoleName;
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  memberId: string;
};

export type TAuthUser = {
  authType: string;
  id: string;
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

export type TSession = {
  userAgent: string;
  expiresAt: string;
};

export type TCurrentProject = {
  id: string;
  name: string;
  icon: string;
  siteUrl: string;
  organizationId: string;
  services: TService[];
};

export type TAuthState = {
  // State properties
  user: TAuthUser | null;
  accessToken: string | null;
  userOrganization: TUserOrganization | null;
  currentProject: TCurrentProject | null;
  // User methods
  getAuthUser: () => TAuthUser | null;
  getSession: () => {
    user: TAuthUser | null;
    userOrganization: TUserOrganization | null;
    session: TSession | null;
    currentProject: TCurrentProject | null;
  };

  // User methods
  setAuthUser: (user: TAuthUser) => void;
  updateAuthUser: (user: Partial<TAuthUser>) => void;

  // Token methods
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;

  session: TSession | null;

  // Organization methods
  setUserOrganization: (userOrganization: TUserOrganization) => void;

  // Current project methods
  setCurrentProject: (currentProject: TCurrentProject) => void;
  getCurrentProject: () => TCurrentProject | null;

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
  session: null,
  currentProject: null,

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
      userOrganization: get().userOrganization,
      session: get().session,
      currentProject: get().currentProject,
    };
  },

  // Organization methods
  setUserOrganization: (userOrganization: TUserOrganization) =>
    set({ userOrganization }),

  // Current project methods
  setCurrentProject: (currentProject: TCurrentProject) =>
    set({ currentProject }),

  getCurrentProject: () => get().currentProject,

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
          set({
            user: data.user as TAuthUser,
            userOrganization: data.userOrganization as TUserOrganization,
            session: {
              userAgent: data.userAgent,
              expiresAt: data.expiresAt,
            },
            currentProject: data.currentProject as TCurrentProject,
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
