export interface AssistantMember {
  email: string;
  role: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface Traffic {
  id: string;
  name: string | null;
  avatar: string | null;
}

export type Content =
  | {
      text: string;
      type: 'text';
    }
  | {
      type: 'image';
      image: string;
    }
  | {
      type: 'audio';
      audio: string;
    }
  | {
      type: 'video';
      video: string;
    }
  | {
      type: 'emojiOrSticker';
      sticker: string;
      emoji: string;
    };

export interface Message {
  id: string;
  conversationId: string;
  content: Content;
  sender: string;
  assistantMemberId: string;
  trafficId: string;
  createdAt: string;
  traffic: Traffic;
  assistantMember: AssistantMember;
}

export interface LatestMessage {
  id: string;
  content: Content;
  sender: 'assistant' | 'traffic';
  assistantMemberId: string;
  createdAt: string;
}

export interface ConversationListItem {
  id: string;
  chatAssistantId: string;
  trafficId: string;
  ticketId: string;
  unread: boolean;
  createdAt: string;
  updatedAt: string;
  latestMessage: LatestMessage;
}

export interface ConversationDetail {
  id: string;
  chatAssistantId: string;
  trafficId: string;
  ticketId: string;
  unread: boolean;
  createdAt: string;
  updatedAt: string;
  latestMessage: Message;
}
