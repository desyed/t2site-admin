import RevalidateLoader from "@/components/RevalidateLoader";
import { Outlet, useNavigation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		0: "#facc15",
		0.5: "#facc15",
		"1.0": "#facc15",
	},
	barThickness: 2,
	shadowBlur: 6,
});

export default function RootLayout() {
	const navigation = useNavigation();
	return (
		<>
			{navigation.state === "loading" && <TopBarProgress />}
			<Outlet />
			<RevalidateLoader />
		</>
	);
}
