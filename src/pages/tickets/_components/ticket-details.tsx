import { useEffect, useState } from "react";
import { TicketDetailEmpty } from "./ticket-detail-empty";
import { useTickets } from "./tickets-provider";

interface TicketData {
	id: string;
	title: string;
	description: string;
}

export const TicketDetails = () => {
	const { selectedTicketId } = useTickets();
	const [ticketData, setTicketData] = useState<TicketData | null>(null);

	// Mock function to fetch new data
	const fetchData = (id: string) => {
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log(`Fetching data for ticket ID: ${id}`);
		// Mock data fetching logic
		const mockData: TicketData = {
			id,
			title: "Sample Ticket",
			description: "This is a sample ticket description.",
		};
		setTicketData(mockData);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (selectedTicketId) {
			fetchData(selectedTicketId);
		}
	}, [selectedTicketId]);

	if (!selectedTicketId) {
		return <TicketDetailEmpty />;
	}

	return (
		<div>
			<h1>Ticket Details</h1>
			{ticketData ? (
				<div>
					<h2>{ticketData.title}</h2>
					<p>{ticketData.description}</p>
				</div>
			) : (
				<p>There was an error fetching the ticket data.</p>
			)}
		</div>
	);
};
