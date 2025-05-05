import { MessageCircleMore } from 'lucide-react';

export default function NoMessages({ ticketId }: { ticketId: string }) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-accent">
          <MessageCircleMore className="size-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium">
          This ticket <span className="text-primary">{ticketId}</span> is empty
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Send a message to the assistant to start the conversation
        </p>
      </div>
    </div>
  );
}
