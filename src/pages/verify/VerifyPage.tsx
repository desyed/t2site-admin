import { sendEmailVericationMutation } from "@/app/auth/authApi";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthProvider";
import { handleApiErrorException } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { toast } from "sonner";

export function Component() {
	const { logout, user } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleSendVerificationCode = () => {
		setLoading(true);
		toast.promise(
			sendEmailVericationMutation(),
			{
				position: "top-center",
				duration: 1000,
				loading: "Sending verification code...",
				success: () => {
					return "A new verification code has been sent!";
				},
				error: (err) => {
					handleApiErrorException(err, true);
					return "Oops! Failed to send the verification code. ";
				},
				finally: () => {
					setLoading(false);
				},
			},
		);
	};
	return (
		<>
			<div className="mb-5">
				<h3 className="text-xl font-semibold text-center">Verify Your Email</h3>
				<p className="mt-2 text-foreground/80">
					To complete your registration, please check your inbox and click on
					the verification link sent to{" "}
					<strong className="text-blue-500 hover:underline font-semibold">
						{user?.email}
					</strong>.
				</p>
				<p className="mt-3 text-muted-foreground">
					{`Didn't`} receive the email? Check your spam or junk folder, or{"  "}
					<button
						disabled={loading}
						onClick={handleSendVerificationCode}
						className="dark:text-primary text-orange-500 ml-2 font-bold hover:underline disabled:opacity-80"
					>
						Click here to resend it
					</button>
					.
				</p>
			</div>
			<VerifyEmailForm />
			<div className="my-2 flex items-center justify-between gap-5">
				<div className="h-[1px] w-[50%] bg-border" />
				<div>OR</div>
				<div className="h-[1px] w-[50%] bg-border" />
			</div>
			<div className="flex flex-col gap-2">
				<Button onClick={logout} size="sm" variant="destructive">
					<Icon icon="material-symbols:logout" /> Logout
				</Button>
			</div>
		</>
	);
}
