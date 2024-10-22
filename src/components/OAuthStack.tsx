import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function OAuthStack() {
	return (
		<>
			<div className="grid flex-1">
				<Button variant="outline" size="lg" data-oauth-type="google">
					<Icon icon="logos:google-icon" />
				</Button>
			</div>
			<div className="grid flex-1">
				<Button variant="outline" size="lg" data-oauth-type="github">
					<Icon icon="fa6-brands:github" />
				</Button>
			</div>
			<div className="grid flex-1">
				<Button variant="outline" size="lg" data-oauth-type="microsoft">
					<Icon icon="logos:microsoft-icon" />
				</Button>
			</div>
		</>
	);
}
