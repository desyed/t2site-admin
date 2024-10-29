import { authPreSessionLoader } from "@/app/auth/authLoader";
import ErrorBoundary from "@/components/ErrorBoundary";
import SplashScreen from "@/components/SplashScreen";
import AuthLayout from "@/layouts/AuthLayout";
import PrivateLayout from "@/layouts/PrivateLayout";
import RootLayout from "@/layouts/RootLayout";
import NotFound from "@/pages/404";
import LoginPage from "@/pages/login/LoginPage";
import SignupPage from "@/pages/signup/SignupPage";
import VerifyPage from "@/pages/verify/VerifyPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorBoundary />,
		loader: authPreSessionLoader,
		children: [
			{
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
					{
						path: "/signup",
						element: <SignupPage />,
					},
					{
						path: "/verify",
						element: <VerifyPage />,
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
