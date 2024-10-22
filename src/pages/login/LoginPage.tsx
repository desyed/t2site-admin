import { InpuLoginForm } from "@/components/LoginForm";
import OAuthStack from "@/components/OAuthStack";
import { Link } from "react-router-dom";

export default function LoginPage() {
	return (
		<div className="rounded-xl border-border/60 bg-transparent px-6 pb-10 sm:border sm:pt-6 dark:sm:bg-muted/30">
			<h3 className="mb-5 text-2xl font-semibold max-sm:text-center sm:mb-5 sm:text-xl">
				Login
			</h3>
			<InpuLoginForm />
			<div className="my-5 flex items-center justify-between gap-5">
				<div className="h-[1px] w-[50%] bg-border" />
				<div>OR</div>
				<div className="h-[1px] w-[50%] bg-border" />
			</div>
			<div className="flex gap-4">
				<OAuthStack />
			</div>
			<div className="mt-4 text-center text-muted-foreground">
				{`Don't`} have an account?{" "}
				<Link
					className="font-semibold underline hover:text-foreground"
					to="/signup"
				>
					{" "}
					Sign up
				</Link>
			</div>
		</div>
	);
}
