import ErrorBoundary from "@/components/ErrorBoundary";
import SplashScreen from "@/components/SplashScreen";
import AuthLayout from "@/layouts/AuthLayout";
import PrivateLayout from "@/layouts/PrivateLayout";
import RootLayout from "@/layouts/RootLayout";
import { delay } from "@/lib/utils";
import NotFound from "@/pages/404";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorBoundary />,

		children: [
			{
				loader: async () => {
					// Pre - session check
					await delay(1000);
					return [];
				},
				element: <PrivateLayout />,
				children: [
					{
						index: true,
						lazy: () => import("@/pages/home/HomePage"),
					},
					{
						path: "/tickets",
						lazy: () => import("@/pages/tickets/TicketsPage"),
					},
					{
						path: "/settings",
						lazy: () => import("@/pages/settings/SettingsPage"),
					},
					{
						path: "/settings/general",
						lazy: () => import("@/pages/settings/general/GeneralSettingsPage"),
					},
					{
						path: "/settings/team",
						lazy: () => import("@/pages/settings/team/TeamSettingsPage"),
					},
				],
			},
			{
				element: <AuthLayout />,
				children: [
					{
						path: "/login",
						element: <LoginPage />,
					},
				],
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

export default function Routers() {
	return <RouterProvider router={routes} fallbackElement={<SplashScreen />} />;
}
