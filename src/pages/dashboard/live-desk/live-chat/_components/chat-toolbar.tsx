import { memo } from 'react';
import { useParams } from 'react-router';

import type { ConversationDetail } from '@/app/features/live-desk/live-desk.type';

import { useOptimisticSendMessageMutation } from '@/app/features/live-desk/live-desk.hooks';
import { useCurrentProjectQuery } from '@/app/project/project.hooks';
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
    const { data: currentProject } = useCurrentProjectQuery();

    const { ticketId } = useParams();

    const { sendAsync } = useOptimisticSendMessageMutation();

    const currentUserAsMember = {
      memberId: currentProject?.currentUser.memberId ?? Date.now().toString(),
      role: currentProject?.currentUser?.role ?? 'member',
    };

    const handleSendTextMessage = (text: string) => {
      if (!ticketId) return;
      if (text === '') return;
      playSendMessageSound();
      sendAsync({
        ticketId,
        conversation,
        content: { type: 'text', text },
        currentUserAsMember,
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
        currentUserAsMember,
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
