import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export type T2OAuthType = "google" | "github" | "microsoft";

export type OAuthButtonProps = {
	type: T2OAuthType;
};

export default function OAuthButton(props: OAuthButtonProps) {
	const { type } = props;
	const location = useLocation();
	function handleOauth() {
		const from = location.state?.from || "/";
		const loginUrl = `${import.meta.env.VITE_OAUTH_URL}/${type}?redirect_path=${from}`;
		window.location.href = loginUrl;
	}

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
		<div className="grid flex-1">
			<Button
				onClick={handleOauth}
				variant="outline"
				size="lg"
				data-oauth-type={type}
			>
				{OAuthIcon}
			</Button>
		</div>
	);
}
