import { MessageCircleMore } from 'lucide-react';

export default function NoMessages({ ticketId }: { ticketId: string }) {
  return (
    <div className="flex h-full items-center justify-center p-10">
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-accent sm:size-14">
          <MessageCircleMore className="size-7 text-muted-foreground sm:size-7" />
        </div>
        <h3 className="mt-4 text-sm font-medium sm:text-lg">
          This ticket <span className="text-primary">{ticketId}</span> is empty
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Send a message to the assistant to start the conversation
        </p>
      </div>
    </div>
  );
}
