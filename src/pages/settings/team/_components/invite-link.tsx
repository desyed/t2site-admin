import { Copy, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export const InviteLink = () => {
	return (
		<div className="w-full max-w-xl  space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-lg font-medium">Invite Link</h3>
					<p className="text-sm text-muted-foreground">
						Share this link with people you want to join your workspace
					</p>
				</div>
				<Switch />
			</div>

			<div className="flex items-center gap-2">
				<Input
					disabled
					value={"https://app.getsupport.com/invite/123456"}
					readOnly
					className="h-9 w-full"
				/>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size={"icon"}
							className="size-9 shrink-0"
							variant={"outline"}
						>
							<RefreshCcw className="size-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Refresh Link</TooltipContent>
				</Tooltip>
				<Button size={"sm"}>
					<Copy className="size-4" />
					Copy
				</Button>
			</div>
		</div>
	);
};
