import { create } from 'zustand';

import type { ConversationDetail } from './live-desk.type';

export type LiveDeskStore = {
  currentConversation: ConversationDetail | null;
  setCurrentConversation: (
    currentConversation: ConversationDetail | null
  ) => void;
};

export const useLiveDeskStore = create<LiveDeskStore>((set) => ({
  currentConversation: null,
  setCurrentConversation: (currentConversation) => set({ currentConversation }),
}));

export const liveDeskStore = useLiveDeskStore.getState();
