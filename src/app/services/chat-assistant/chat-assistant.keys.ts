export const conversationKeys = {
  all: ['conversations'] as const,
  list: (chatAssistantId: string) =>
    [...conversationKeys.all, chatAssistantId, 'list'] as const,
  cursor: (chatAssistantId: string, cursor: string) =>
    [...conversationKeys.all, chatAssistantId, 'cursor', cursor] as const,
  detail: (ticketId: string) =>
    [...conversationKeys.all, ticketId, 'detail'] as const,
};

export const messageKeys = {
  all: ['messages'] as const,
  cursor: (ticketId: string, cursor: string) =>
    [...messageKeys.all, ticketId, 'cursor', cursor] as const,
};

export const chatAreaQueryKey = (ticketId: string) => [
  'messages',
  'page',
  ticketId,
];
