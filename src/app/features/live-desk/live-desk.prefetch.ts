import { queryClient } from '@/query-client';

import type { ApiMessagesResponse } from './live-desk.type';

import {
  fetchConversationDetail,
  fetchConversationMessagesPage,
  fetchConversations,
} from './live-desk.fetch';
import { chatAreaQueryKey, conversationKeys } from './live-desk.keys';

export async function preFetchConversationDetail(ticketId: string) {
  return await queryClient.fetchQuery({
    queryKey: conversationKeys.detail(ticketId),
    queryFn: () => fetchConversationDetail(ticketId),
  });
}

export function preFetchConversationListQuery(liveDeskId: string) {
  const query = queryClient.prefetchQuery({
    queryKey: conversationKeys.list(liveDeskId),
    queryFn: () => fetchConversations(liveDeskId),
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
