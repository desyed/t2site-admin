import { PackageOpen } from "lucide-react";

export const TicketDetailEmpty = () => {
	return (
		<div className="flex items-center gap-2 h-full justify-center flex-col">
			<PackageOpen className="w-16 h-16 text-muted-foreground stroke-[1.5]" />
			<p className="text-sm text-muted-foreground text-center">
				No ticket selected. <br /> Select a ticket to view details.
			</p>
		</div>
	);
};
