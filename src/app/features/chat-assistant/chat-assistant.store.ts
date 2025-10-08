import { create } from 'zustand';

import type { ConversationDetail } from './chat-assistant.type';

export type ChatAssistantStore = {
  currentConversation: ConversationDetail | null;
  setCurrentConversation: (
    currentConversation: ConversationDetail | null
  ) => void;
};

export const useChatAssistantStore = create<ChatAssistantStore>((set) => ({
  currentConversation: null,
  setCurrentConversation: (currentConversation) => set({ currentConversation }),
}));

export const chatAssistantStore = useChatAssistantStore.getState();
