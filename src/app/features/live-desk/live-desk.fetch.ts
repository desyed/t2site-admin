import { delay } from '@/lib/utils';

import type {
  ApiMessagesParams,
  ApiMessagesResponse,
  ConversationDetail,
  ConversationListItem,
  Message,
} from './live-desk.type';

import {
  getConversationApi,
  getConversationDetailApi,
  getConversationMessagesApi,
} from './live-desk.api';

export async function fetchConversations(liveDeskId: string) {
  const result = (await getConversationApi(liveDeskId)) as any;
  return result?.data?.data as ConversationListItem[];
}

export async function fetchConversationsMap(
  liveDeskId: string
): Promise<Map<string, ConversationListItem>> {
  const result = (await getConversationApi(liveDeskId)) as any;
  const items = result?.data?.data as ConversationListItem[];

  return new Map<string, ConversationListItem>(
    items.map((item) => [item.id, item])
  );
}

export async function fetchConversationDetail(liveDeskId: string) {
  const result = (await getConversationDetailApi(liveDeskId)) as any;
  return result?.data?.data as ConversationDetail;
}

export async function fetchConversationMessages(
  ticketId: string,
  params?: ApiMessagesParams
) {
  const result = (await getConversationMessagesApi(ticketId, params)) as any;
  return result?.data?.data as Message[];
}

export async function fetchConversationMessagesPage(
  ticketId: string,
  params?: ApiMessagesParams
) {
  if (import.meta.env.DEV) {
    await delay(400);
  }
  const result = await getConversationMessagesApi(ticketId, params);
  return result?.data as ApiMessagesResponse;
}
