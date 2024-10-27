import OAuthButton from "./OAuthButton";

export default function OAuthStack() {
	return (
		<>
			<OAuthButton type="google" />
			<OAuthButton type="github" />
			<OAuthButton type="microsoft" />
		</>
	);
}
