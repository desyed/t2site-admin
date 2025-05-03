import { CircleX } from 'lucide-react';

export default function SelectNotFoundConversation() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <CircleX className="mx-auto size-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">
          No conversation found with this ticket ID
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Please check the ticket ID and try again
        </p>
      </div>
    </div>
  );
}
