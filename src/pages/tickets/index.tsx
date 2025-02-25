import { Tickets } from './_components/tickets';
import { TicketsProvider } from './_components/tickets-provider';

export async function loader() {
  return {
    title: 'tickets',
  };
}
export function Component() {
  return (
    <TicketsProvider>
      <Tickets />
    </TicketsProvider>
  );
}
