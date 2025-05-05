export interface AssistantMember {
  email: string;
  role: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    email: string;
  };
}

export interface ApiMessagesParams {
  nextCursor?: string;
  prevCursor?: string;
  limit?: number;
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
      sticker?: string;
      emoji?: string;
    };

export interface Message {
  id: string;
  conversationId: string;
  content: Content;
  sender: 'assistant' | 'traffic';
  assistantMemberId: string;
  trafficId: string;
  createdAt: string;
  traffic: Traffic;
  assistantMember: AssistantMember;
  optimistic?: {
    pending?: boolean;
    failed?: boolean;
    error?: string | null;
  };
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

export interface Pagination {
  nextCursor: string;
  prevCursor: string;
  limit: number;
  maxLimit: number;
  hasMore: boolean;
}

export interface ApiMessagesResponse {
  data: Message[];
  pagination: Pagination;
}

export interface SendMessagePayload {
  ticketId: string;
  content: Content;
}

export interface SendMessageResponse {
  conversation: Omit<ConversationDetail, 'latestMessage'>;
  newMessage: Message;
}
