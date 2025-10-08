import { queryClient } from '@/query-client';

import type { ApiMessagesResponse } from './chat-assistant.type';

import {
  fetchConversationDetail,
  fetchConversationMessagesPage,
  fetchConversations,
} from './chat-assistant.fetch';
import { chatAreaQueryKey, conversationKeys } from './chat-assistant.keys';

export async function preFetchConversationDetail(ticketId: string) {
  return await queryClient.fetchQuery({
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

export async function preFetchConversationMessagesInfiniteQuery(
  ticketId: string
) {
  await queryClient.prefetchInfiniteQuery<ApiMessagesResponse>({
    queryKey: chatAreaQueryKey(ticketId),
    queryFn: ({ pageParam = undefined }) => {
      return fetchConversationMessagesPage(ticketId as string, {
        prevCursor: pageParam as string | undefined,
      });
    },
    initialPageParam: undefined,
  });
}
