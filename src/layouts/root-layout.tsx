import { Outlet, useNavigation } from "react-router";
import TopBarProgress from "react-topbar-progress-indicator";

import RevalidateLoader from "@/components/revalidate-loader";

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
