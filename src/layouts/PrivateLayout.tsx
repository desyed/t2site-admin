import { useAuth } from "@/contexts/AuthProvider";
import DashBoardContent from "@/layouts/dashboard/DashBoardContent";
import DashBoardSidebar from "@/layouts/dashboard/DashBoardSidebard";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateLayout() {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate state={{ from: location }} to={"/login"} />;
	}

	return (
		<DashBoardSidebar>
			<DashBoardContent>
				<Outlet />
			</DashBoardContent>
		</DashBoardSidebar>
	);
}
