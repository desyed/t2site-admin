import type {
  ConversationDetail,
  ConversationListItem,
} from './chat-assistant.type';

import {
  getConversationApi,
  getConversationDetailApi,
} from './chat-assistant.api';
export async function fetchConversations(chatAssistantId: string) {
  const result = (await getConversationApi(chatAssistantId)) as any;
  return result?.data?.data as ConversationListItem[];
}

export async function fetchConversationDetail(ticketId: string) {
  const result = (await getConversationDetailApi(ticketId)) as any;
  return result?.data?.data as ConversationDetail;
}
