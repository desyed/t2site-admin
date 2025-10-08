import { AxiosError } from 'axios';
import { redirect } from 'react-router';

import {
  preFetchConversationDetail,
  preFetchConversationMessagesInfiniteQuery,
} from '@/app/features/chat-assistant/chat-assistant.prefetch';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import { ChatArea } from '../_components/chat-area';

export const loader = createDashboardLoader(async ({ params }) => {
  const { ticketId, projectId } = params;

  if (!ticketId) {
    return redirect(`/${projectId}/live-desk/live-chat/not-found`);
  }

  try {
    await preFetchConversationDetail(ticketId as string);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        return redirect(`/${projectId}/live-desk/live-chat/not-found`);
      }
    }
  }

  await preFetchConversationMessagesInfiniteQuery(ticketId as string);

  return {};
});

export function Component() {
  return <ChatArea />;
}
