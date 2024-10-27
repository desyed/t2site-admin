import { type TAuthUser, useAuthStore } from "@/app/auth/authStore";
import { delay } from "@/lib/utils";
import { type ReactNode, createContext, useContext, useMemo } from "react";
import { toast } from "sonner";

interface AuthContextType {
	isAuthenticated: boolean;
	login: (email: string, password: string) => void | Promise<void>;
	logout: () => void | Promise<void>;
	isLogingOut: boolean;
	user: TAuthUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const user = useAuthStore((state) => state.user);
	const isLogingOut = useAuthStore((state) => state.isLogingOut);

	const accessToken = useAuthStore((state) => state.accessToken);
	const logoutHandle = useAuthStore((state) => state.logout);

	const isAuthenticated = useMemo(
		() => !!(accessToken && user),
		[accessToken, user],
	);

	const login = async () => {
		toast.promise(delay(1000), {
			loading: "Loging in...",
			success: () => {
				return "You have loged in";
			},
			position: "top-center",
			duration: 1000,
			error: () => "Logged in failed",
		});
	};

	const logout = () => {
		toast.promise(logoutHandle, {
			loading: "Singing in...",
			success: () => {
				return "You have loged out";
			},
			finally: () => {},
			position: "top-center",
			duration: 1000,
			error: () => "Signed out failed !!",
		});
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, login, logout, user, isLogingOut }}
		>
			{children}
		</AuthContext.Provider>
	);
};
