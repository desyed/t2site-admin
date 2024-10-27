import { handleApiMutationError } from "@/lib/error";
import { delay } from "@/lib/utils";
import { create } from "zustand";
import { getSessionQuery, logoutMutaion } from "./authApi";

export type TAuthUser = {
	sub: string;
	name: string;
	email: string;
	avatar: string;
};

export type TAuthState = {
	accessToken: string | null;
	user: TAuthUser | null;
	updateAuthUser: (user: Partial<TAuthUser>) => void;
	setAuthUser: (user: TAuthUser) => void;
	setAccessToken: (accessToken: string) => void;
	resetAuth: () => void;
	fetchSession: () => Promise<void>;
	logout: () => Promise<void>;
	isLogingOut: boolean;
};

export const useAuthStore = create<TAuthState>((set, get) => ({
	accessToken: window.localStorage.getItem("t2site_ac"),
	user: null,
	isLogingOut: false,
	setAuthUser: (user) => set({ user: user }),
	updateAuthUser: (user) =>
		set((state) => ({
			user: state.user
				? { ...state.user, ...user }
				: ({ ...user } as TAuthUser),
		})),
	setAccessToken: (accessToken) => {
		window.localStorage.setItem("t2site_ac", accessToken);
		set({ accessToken: accessToken });
	},
	resetAuth: () => {
		window.localStorage.removeItem("t2site_ac");
		set({
			accessToken: null,
			user: null,
		});
	},
	fetchSession: async () => {
		try {
			const result = await getSessionQuery();
			set({ user: result.data as TAuthUser });
		} catch (err) {}
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
