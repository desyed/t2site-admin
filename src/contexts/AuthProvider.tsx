import { type TAuthUser, useAuthStore } from "@/app/auth/authStore";
import { createContext, type ReactNode, useContext } from "react";
import { toast } from "sonner";

interface AuthContextType {
	isAuthenticated: boolean;
	user: TAuthUser | null;
	isEmailVerified: boolean;
	logout: () => void | Promise<void>;
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
	const logoutHandle = useAuthStore((state) => state.logout);

	const isAuthenticated = !!user?.email;
	const isEmailVerified = !!user?.emailVerified;

	const logout = () => {
		toast.promise(logoutHandle, {
			loading: "Signing out...",
			success: "You have logged out",
			error: "Sign out failed!",
			position: "top-center",
			duration: 1000,
			finally: () => {},
		});
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				isEmailVerified,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
