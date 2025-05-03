import { useQuery } from '@tanstack/react-query';

import {
  fetchConversationDetail,
  fetchConversations,
} from './chat-assistant.fetch';
import { conversationKeys } from './chat-assistant.keys';

export function useConversationDetailQuery(ticketId: string) {
  const query = useQuery({
    queryKey: conversationKeys.detail(ticketId),
    queryFn: () => fetchConversationDetail(ticketId),
  });
  return query;
}

export function useConversationListQuery(
  chatAssistantId: string,
  enabled: boolean = true
) {
  const query = useQuery({
    queryKey: conversationKeys.list(chatAssistantId),
    queryFn: () => fetchConversations(chatAssistantId),
    enabled,
  });
  return query;
}
