import { type TAuthUser, useAuthStore } from "@/app/auth/authStore";
import { createContext, type ReactNode, useContext } from "react";
import { toast } from "sonner";

interface AuthContextType {
	isAuthenticated: boolean;
	logout: () => void | Promise<void>;
	isLogingOut: boolean;
	user: TAuthUser | null;
	isEmailVerified: boolean;
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

	const logoutHandle = useAuthStore((state) => state.logout);

	const isAuthenticated = !!user?.email;
	const isEmailVerified = !!user?.emailVerified;

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
			value={{
				isAuthenticated,
				logout,
				user,
				isLogingOut,
				isEmailVerified,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
