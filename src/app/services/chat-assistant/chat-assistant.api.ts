import { api } from '@/lib/api';

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
export function getMessagesApi(ticketId: string) {
  return api.get(`/services/chat-assistant/${ticketId}/messages`);
}

/**
 * @POST /services/chat-assistant/:ticketId/send-message
 */
export function sendMessageApi(ticketId: string, payload: object) {
  return api.post(`/services/chat-assistant/${ticketId}/send-message`, payload);
}
