import { redirect } from 'react-router';

import {
  preFetchConversationDetail,
  preFetchConversationMessagesInfiniteQuery,
} from '@/app/services/chat-assistant/chat-assistant.prefetch';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import { ChatArea } from '../_components/chat-area';

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
  return <ChatArea />;
}
