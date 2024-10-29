import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export type T2OAuthType = "google" | "github" | "microsoft";

export type OAuthButtonProps = {
	type: T2OAuthType;
	label?: boolean;
};

export default function OAuthButton(props: OAuthButtonProps) {
	const { type, label = true } = props;
	const location = useLocation();

	const from = location.state?.from || "/";

	const OAuthIcon = useMemo(() => {
		switch (type) {
			case "google":
				return <Icon icon="logos:google-icon" />;
			case "github":
				return <Icon icon="fa6-brands:github" />;
			case "microsoft":
				return <Icon icon="logos:microsoft-icon" />;
		}
	}, [type]);

	return (
		<form action={`${import.meta.env.VITE_OAUTH_URL}/${type}`} method="post">
			<input type="hidden" name="redirect_path" value={from} />
			<input type="hidden" name="csrf_token" value="asdkasdkjasdjkasdjkl" />
			<div className="grid flex-1">
				<Button
					variant="outline"
					size="sm"
					className="capitalize"
					type="submit"
					data-oauth-type={type}
				>
					{OAuthIcon}
					{label && `Continue With ${type}`}
				</Button>
			</div>
		</form>
	);
}
