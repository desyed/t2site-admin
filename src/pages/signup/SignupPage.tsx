import OAuthButton from "@/components/auth/OAuthButton";
import SingupForm from "@/components/auth/SignupForm";
import { Link } from "react-router-dom";

export default function SignupPage() {
	return (
		<>
			<h3 className="mb-5 text-2xl font-semibold text-center sm:mb-5 ">
				Signup
			</h3>
			<SingupForm />
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
				I already have an account
				<Link
					className="font-semibold cursor-pointer underline hover:text-foreground"
					to="/login"
				>
					{" "}
					Log in
				</Link>
			</div>
		</>
	);
}
