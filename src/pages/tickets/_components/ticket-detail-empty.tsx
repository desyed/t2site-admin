import { PackageOpen } from "lucide-react";

export const TicketDetailEmpty = () => {
	return (
		<div className="flex h-full flex-col items-center justify-center gap-2">
			<PackageOpen className="size-16 stroke-[1.5] text-muted-foreground" />
			<p className="text-center text-sm text-muted-foreground">
				No ticket selected. <br /> Select a ticket to view details.
			</p>
		</div>
	);
};
