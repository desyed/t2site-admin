import { memo } from 'react';

import {
  playSendMessageSound,
  playSendStickerSound,
} from '@/audio-contenxt/system';

import { MessageInputArea } from './message-input-area';

export const ChatToolbar = memo(() => {
  const handleSendTextMessage = (_textMessage: string) => {
    playSendMessageSound();
  };

  const handleSendEmojiMessage = (_emoji: string) => {
    playSendStickerSound();
  };

  return (
    <MessageInputArea
      onSendTextMessage={handleSendTextMessage}
      onSendEmojiMessage={handleSendEmojiMessage}
    />
  );
});

ChatToolbar.displayName = 'ChatToolbar';
