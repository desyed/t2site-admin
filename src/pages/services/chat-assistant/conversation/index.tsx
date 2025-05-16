import { redirect } from 'react-router';

import {
  preFetchConversationDetail,
  preFetchConversationMessagesInfiniteQuery,
} from '@/app/services/chat-assistant/chat-assistant.prefetch';
import FetchErrorView from '@/components/fetch-error-view';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import { ChatArea } from '../_components/chat-area';
import ChatConnectionView from '../_components/chat-connection-view';
import { useChatRealtime } from '../chat-realtime';

export const loader = createDashboardLoader(async ({ params }) => {
  const { ticketId } = params;

  if (!ticketId) {
    return redirect('/services/chat-assistant/not-found');
  }

  await preFetchConversationDetail(ticketId as string);
  await preFetchConversationMessagesInfiniteQuery(ticketId as string);

  return {};
});

export function Component() {
  const { isPusherConnected, channelInfo } = useChatRealtime();

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

  return <ChatArea />;
}
