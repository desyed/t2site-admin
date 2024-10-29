import { handleApiMutationError } from '@/lib/error';
import { delay, EmailAddress, isValidEmail } from '@/lib/utils';
import { create } from 'zustand';
import { getSessionQuery, logoutMutaion } from './authApi';

export type TAuthUser = {
  sub: string;
  name: string;
  email: string;
  avatar: string;
};

export type TAuthState = {
  user: TAuthUser | null;
  updateAuthUser: (user: Partial<TAuthUser>) => void;
  setAuthUser: (user: TAuthUser) => void;
  resetAuth: () => void;
  unverifiedEmail: null | EmailAddress;
  fetchSession: () => Promise<void>;
  setUnverified: (email: string) => void;
  logout: () => Promise<void>;
  isLogingOut: boolean;
};

export const useAuthStore = create<TAuthState>((set, get) => ({
  user: null,
  isLogingOut: false,
  unverifiedEmail: null,
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
    });
    localStorage.removeItem('t2_se_act');
  },
  fetchSession: async () => {
    try {
      const result = await getSessionQuery();
      set({ user: result.data as TAuthUser });
    } catch (err) {}
  },
  setUnverified: (email: string) => {
    if (isValidEmail(email)) {
      set({
        unverifiedEmail: email,
      });
    }
  },
  async logout() {
    try {
      await delay(500);
      await logoutMutaion();
      set({
        isLogingOut: true,
      });
      get().resetAuth();
    } catch (err) {
      handleApiMutationError(err);
    }
  },
}));

export const authStore = useAuthStore.getState();
