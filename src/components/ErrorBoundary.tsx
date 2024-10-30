import Brand from "@/components/Brand";
import { ModeToggle } from "@/components/mode-toggle";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useRouteError } from "react-router-dom";
import { isRouteErrorResponse } from "react-router-dom";

export default function ErrorBoundary() {
	const error = useRouteError();
	console.error(error);

	let errorMessage = "An unexpected error occurred";
	let errorType = "default";

	if (isRouteErrorResponse(error)) {
		errorMessage =
			error.statusText || "An error occurred while fetching the route";
	} else if (error instanceof Error) {
		errorMessage = error.message;
		if (
			error.message.startsWith("Failed to fetch dynamically imported module")
		) {
			errorType = "fetch";
		}
	}

	return (
		<div className="min-h-screen px-4">
			<div className="flex h-[90px] items-center justify-between px-6 sm:px-10">
				<div>
					<Brand />
				</div>
				<div>
					<ModeToggle />
				</div>
			</div>
			<div className="container mx-auto mt-20 text-center">
				{errorType === "fetch" ? (
					<div>
						<Alert className="mb-5 p-5">
							<AlertCircle className="h-5 w-5" />
							<p>Check your internet connection or refresh the page.</p>
						</Alert>
						<Button
							onClick={() => window.location.reload()}
							className="mt-5"
							size="lg"
						>
							<RefreshCw className="mr-2 h-5 w-5" />
							Refresh
						</Button>
					</div>
				) : (
					<div>
						<h1 className="mb-5 text-2xl font-bold">
							There is a problem with the application.
						</h1>
						<p className="text-lg text-muted">{errorMessage}</p>
						<Button onClick={() => window.location.reload()} size="lg">
							<RefreshCw className="mr-2 h-5 w-5" />
							Refresh
						</Button>
					</div>
				)}
				{/* Show error stack in development mode */}
				{import.meta.env.DEV && error instanceof Error && (
					<div className="mt-5 rounded-lg dark:bg-red-700/20 p-4 dark:text-red-600 dark:border-red-600 border border-red-500 text-red-500 bg-red-400/10">
						<pre className="whitespace-pre-wrap text-left">{error.stack}</pre>
					</div>
				)}
			</div>
		</div>
	);
}
