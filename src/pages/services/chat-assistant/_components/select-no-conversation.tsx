import { MessageSquare } from 'lucide-react';

import FetchErrorView from '@/components/fetch-error-view';
import { useMediaQuery } from '@/hooks/use-mobile';

import { useChatRealtime } from '../chat-realtime';
import ChatConnectionView from './chat-connection-view';

export default function SelectNoConversation() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const { isPusherConnected, channelInfo } = useChatRealtime();

  if (!isDesktop) {
    return null;
  }

  if (!isPusherConnected) {
    return <ChatConnectionView />;
  }

  if (channelInfo?.error) {
    return (
      <div className="flex h-full items-center justify-center">
        <FetchErrorView
          title="Chat Assistant"
          errorActions={{
            primary: {
              label: 'Refresh',
              onClick: () => window.location.reload(),
            },
          }}
        />
      </div>
    );
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
