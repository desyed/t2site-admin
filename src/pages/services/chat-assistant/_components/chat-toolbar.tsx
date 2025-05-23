import { memo } from 'react';
import { useParams } from 'react-router';

import type { ConversationDetail } from '@/app/services/chat-assistant/chat-assistant.type';

import { useOptimisticSendMessageMutation } from '@/app/services/chat-assistant/chat-assistant.hooks';
import {
  playSendMessageSound,
  playSendStickerSound,
} from '@/audio-contenxt/system';

import { MessageInputArea } from './message-input-area';

type ChatToolbarProps = {
  conversation: ConversationDetail;
  onSendTextMessage: (text: string) => void;
  onSendEmojiMessage: (emoji: string) => void;
};

export const ChatToolbar = memo<ChatToolbarProps>(
  ({ conversation, onSendTextMessage, onSendEmojiMessage }) => {
    const { ticketId } = useParams();

    const { sendAsync } = useOptimisticSendMessageMutation();

    const handleSendTextMessage = (text: string) => {
      if (!ticketId) return;
      if (text === '') return;
      playSendMessageSound();
      sendAsync({
        ticketId,
        conversation,
        content: { type: 'text', text },
      });

      onSendTextMessage(text);
    };

    const handleSendEmojiMessage = (emoji: string) => {
      if (!ticketId) return;
      if (emoji === '') return;

      playSendStickerSound();

      sendAsync({
        ticketId,
        conversation,
        content: { type: 'emojiOrSticker', emoji },
      });

      onSendEmojiMessage(emoji);
    };

    return (
      <MessageInputArea
        onSendTextMessage={handleSendTextMessage}
        onSendEmojiMessage={handleSendEmojiMessage}
      />
    );
  }
);

ChatToolbar.displayName = 'ChatToolbar';
