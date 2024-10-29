import LoginForm from "@/components/auth/LoginForm";
import OAuthButton from "@/components/auth/OAuthButton";
import { getQuery, removeQueryFromUrl } from "@/lib/utils";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function LoginPage() {
	useEffect(() => {
		const error = getQuery("error");
		if (error && error.length > 3) {
			let message = error;
			setTimeout(() => {
				toast.error("Loging Failed", {
					description: message,
					position: "top-center",
					duration: 1600,
					closeButton: true,
				});
			}, 400);
			removeQueryFromUrl("error");
		}
	}, []);

	return (
		<>
			<h3 className="mb-5 text-2xl font-semibold text-center sm:mb-5 ">
				Login
			</h3>
			<LoginForm />
			<div className="my-3 flex items-center justify-between gap-5">
				<div className="h-[1px] w-[50%] bg-border" />
				<div>OR</div>
				<div className="h-[1px] w-[50%] bg-border" />
			</div>
			<div className="flex flex-col gap-2">
				<OAuthButton type="google" />
				<OAuthButton type="github" />
			</div>

			<div className="mt-5 text-center text-muted-foreground">
				{`Don't`} have an account?{" "}
				<Link
					className="font-semibold underline hover:text-foreground"
					to="/signup"
				>
					{" "}
					Sign up
				</Link>
			</div>
		</>
	);
}
