import { Inbox } from 'lucide-react';

export default function NoConversationMessage() {
  return (
    <div className="flex h-full flex-col items-center gap-3 py-20 text-center">
      <Inbox className="size-12 text-muted-foreground" />
      <p className="text-muted-foreground">No conversations found</p>
      <p className="max-w-sm px-4 text-sm text-muted-foreground/70">
        No conversations yet. New conversations will appear here when new
        traffic starts.
      </p>
    </div>
  );
}
