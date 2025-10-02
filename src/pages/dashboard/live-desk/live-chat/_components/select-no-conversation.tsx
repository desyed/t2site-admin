import { MessageSquare } from 'lucide-react';

import { useMediaQuery } from '@/hooks/use-mobile';

export default function SelectNoConversation() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  if (!isDesktop) {
    return null;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <MessageSquare className="mx-auto size-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No conversation selected</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
}
