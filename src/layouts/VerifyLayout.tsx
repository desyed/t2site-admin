import Brand from "@/components/Brand";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/contexts/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function VerifyLayout() {
	const { isAuthenticated, isEmailVerified } = useAuth();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	if (!isAuthenticated) {
		return (
			<Navigate
				state={{ from }}
				to={"/login"}
			/>
		);
	}

	if (isAuthenticated && isEmailVerified) {
		return <Navigate to={from} replace />;
	}

	return (
		<div className="relative flex min-h-screen flex-col">
			<div className="flex h-[90px] items-center justify-between px-6 sm:px-10 absolute right-0">
				<div></div>
				<div>
					<ModeToggle />
				</div>
			</div>
			<div className="flex flex-1 justify-center gap-10 sm:items-center sm:p-8 flex-col mt-16">
				<div className="flex justify-center">
					<Brand />
				</div>
				<div className="flex flex-1 flex-col gap-5  max-sm:justify-between sm:max-w-[390px]">
					<div className="rounded-xl border-border/60 bg-transparent px-6 pb-10 sm:border sm:pt-6 dark:sm:bg-muted/30 sm:bg-muted/50 overflow-x-hidden">
						<Outlet />
					</div>

					<div className="px-5 pb-10 text-center text-sm text-muted-foreground">
						By clicking continue, you agree to our{" "}
						<a className="underline hover:text-foreground" href="/terms">
							Terms of Service
						</a>{" "}
						and{" "}
						<a
							className="underline hover:text-foreground"
							href="/privacy-policy"
						>
							Privacy Policy
						</a>
						.
					</div>
				</div>
			</div>
		</div>
	);
}
