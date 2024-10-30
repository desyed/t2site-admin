import { delay } from "@/lib/utils";
import { Tickets } from "./_components/tickets";
import { TicketsProvider } from "./_components/tickets-provider";

export async function loader() {
	await delay(500);
	return {
		title: "tickets",
	};
}
export function Component() {
	return (
		<TicketsProvider>
			<Tickets />
		</TicketsProvider>
	);
}
