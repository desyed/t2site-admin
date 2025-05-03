import { queryClient } from '@/query-client';

import {
  fetchConversationDetail,
  fetchConversations,
} from './chat-assistant.fetch';
import { conversationKeys } from './chat-assistant.keys';

export async function preFetchConversationDetail(ticketId: string) {
  await queryClient.prefetchQuery({
    queryKey: conversationKeys.detail(ticketId),
    queryFn: () => fetchConversationDetail(ticketId),
  });
}

export function preFetchConversationListQuery(chatAssistantId: string) {
  const query = queryClient.prefetchQuery({
    queryKey: conversationKeys.list(chatAssistantId),
    queryFn: () => fetchConversations(chatAssistantId),
  });
  return query;
}
