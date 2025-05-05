import { api } from '@/lib/api';

import type {
  ApiMessagesParams,
  SendMessagePayload,
} from './chat-assistant.type';

/**
 * @GET /services/chat-assistant/:chatAssistantId/conversations
 */
export function getConversationApi(chatAssistantId: string) {
  return api.get(`/services/chat-assistant/${chatAssistantId}/conversations`);
}

/**
 * @GET /services/chat-assistant/:ticketId/conversation
 */
export function getConversationDetailApi(ticketId: string) {
  return api.get(`/services/chat-assistant/${ticketId}/conversation`);
}

/**
 * @GET /services/chat-assistant/:ticketId/messages
 */
export function getConversationMessagesApi(
  ticketId: string,
  params?: ApiMessagesParams
) {
  return api.get(`/services/chat-assistant/${ticketId}/messages`, { params });
}

/**
 * @POST /services/chat-assistant/:ticketId/send-message
 */
export function sendMessageApi(payload: SendMessagePayload) {
  return api.post(
    `/services/chat-assistant/${payload.ticketId}/send-message`,
    payload
  );
}
