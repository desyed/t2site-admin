import { useAuth } from "@/contexts/AuthProvider";
import DashBoardContent from "@/layouts/dashboard/DashBoardContent";
import DashBoardSidebar from "@/layouts/dashboard/DashBoardSidebard";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateLayout() {
	const { isAuthenticated, isLogingOut, isEmailVerified } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return (
			<Navigate
				state={{ from: isLogingOut ? "/" : location.pathname }}
				to={"/login"}
			/>
		);
	}

	if (!isEmailVerified && isAuthenticated) {
		return (
			<Navigate
				state={{ from: isLogingOut ? "/" : location.pathname }}
				to={"/verify"}
			/>
		);
	}

	return (
		<DashBoardSidebar>
			<DashBoardContent>
				<Outlet />
			</DashBoardContent>
		</DashBoardSidebar>
	);
}
