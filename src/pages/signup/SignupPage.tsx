import { Link } from  "react-router";

import OAuthButton from "@/components/auth/OAuthButton";
import SingupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
	return (
		<>
			<h3 className="mb-5 text-center text-2xl font-semibold sm:mb-5 ">
				Signup
			</h3>
			<SingupForm />
			<div className="my-3 flex items-center justify-between gap-5">
				<div className="h-px w-1/2 bg-border" />
				<div>OR</div>
				<div className="h-px w-1/2 bg-border" />
			</div>
			<div className="flex flex-col gap-2">
				<OAuthButton type="google" />
				<OAuthButton type="github" />
			</div>

			<div className="mt-5 text-center text-muted-foreground">
				I already have an account
				<Link
					className="cursor-pointer font-semibold underline hover:text-foreground"
					to="/login"
				>
					{" "}
					Log in
				</Link>
			</div>
		</>
	);
}
