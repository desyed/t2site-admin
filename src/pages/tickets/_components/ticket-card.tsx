import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { useTickets } from './tickets-provider';

interface TicketCardProps {
  ticketId: string;
}

export const TicketCard = ({ ticketId }: TicketCardProps) => {
  const { selectedTicketId, setSelectedTicketId } = useTickets();
  return (
    <Card
      className={cn(
        'p-4 rounded-md hover:bg-muted/40 transition-colors space-y-2',
        selectedTicketId === ticketId && 'border-orange-400'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedTicketId(ticketId);
            }}
            className="w-44 cursor-pointer truncate text-sm font-semibold"
          >
            Ticket #{ticketId}
          </button>
        </div>
        <p className="text-sm text-muted-foreground">2 days ago</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary">New</Badge>
        <Badge variant="secondary">Open</Badge>
      </div>
      <p className="line-clamp-2 text-xs text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, doloribus libero expedita
        dignissimos similique eum consectetur, non atque mollitia magni ea, aperiam laudantium eos
        voluptatibus aliquid maxime magnam dolorum ab.
      </p>
    </Card>
  );
};
