import { api } from '@/lib/api';

import type { ApiMessagesParams, SendMessagePayload } from './live-desk.type';

export function getConversationApi(liveDeskId: string) {
  return api.get(`/features/live-desk/${liveDeskId}/conversations`);
}

export function getConversationDetailApi(ticketId: string) {
  return api.get(`/features/live-desk/${ticketId}/conversation`);
}

export function getConversationMessagesApi(
  ticketId: string,
  params?: ApiMessagesParams
) {
  return api.get(`/features/live-desk/${ticketId}/messages`, { params });
}

export function sendMessageApi(payload: SendMessagePayload) {
  return api.post(
    `/features/live-desk/${payload.ticketId}/send-message`,
    payload
  );
}
