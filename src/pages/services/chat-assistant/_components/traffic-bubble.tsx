import { memo, useMemo } from 'react';

import type { Message } from '@/app/services/chat-assistant/chat-assistant.type';

import { formatSmartTimestamp, timeGap } from '@/lib/time';
import { cn } from '@/lib/utils';

import { DisplayTime } from './display-time';

export interface TrafficBubbleProps {
  message: Message;
  isLastMessage: boolean;
  previousMessage: Message | null;
  nextMessage: Message | null;
  isFirstMessage: boolean;
}

const thirtyMinutes = 1000 * 60 * 30;

export const TrafficBubble = memo(
  ({
    message,
    previousMessage,
    nextMessage,
    isFirstMessage,
    isLastMessage,
  }: TrafficBubbleProps) => {
    const timeDelay =
      previousMessage?.createdAt &&
      timeGap(message.createdAt, previousMessage?.createdAt) > thirtyMinutes;

    const displayMessage = useMemo(() => {
      if (isFirstMessage) {
        return <DisplayTime timestamp={message.createdAt} />;
      }
      if (timeDelay) {
        return <DisplayTime timestamp={message.createdAt} />;
      }
      if (previousMessage?.sender !== message.sender) {
        return <DisplayTime timestamp={message.createdAt} />;
      }
      return null;
    }, [
      previousMessage?.sender,
      message.sender,
      message.createdAt,
      timeDelay,
      isFirstMessage,
    ]);

    const isAloneTextMessage = () => {
      if (
        message.sender !== previousMessage?.sender &&
        message.sender !== nextMessage?.sender
      ) {
        return true;
      }

      if (
        message.content.type === 'text' &&
        previousMessage?.content.type === 'emojiOrSticker' &&
        isLastMessage
      ) {
        return true;
      }

      if (
        message.content.type === 'text' &&
        nextMessage?.content.type === 'emojiOrSticker' &&
        isFirstMessage
      ) {
        return true;
      }

      if (
        previousMessage?.content.type === 'emojiOrSticker' &&
        nextMessage?.content.type === 'emojiOrSticker' &&
        message.content.type === 'text' &&
        message.sender === nextMessage?.sender
      ) {
        return true;
      }

      if (timeDelay && isLastMessage) {
        return true;
      }

      if (timeDelay && isLastMessage) {
        return true;
      }

      if (
        timeDelay &&
        nextMessage?.createdAt &&
        timeGap(nextMessage?.createdAt, message?.createdAt) > thirtyMinutes
      ) {
        return true;
      }

      if (
        timeDelay &&
        isFirstMessage &&
        message.sender === previousMessage?.sender
      ) {
        return true;
      }
      return false;
    };

    const isStartTextMessage = () => {
      if (isAloneTextMessage()) {
        return false;
      }
      if (
        previousMessage?.content.type === 'emojiOrSticker' &&
        message.content.type == 'text' &&
        message.sender === previousMessage?.sender
      ) {
        return true;
      }
      if (previousMessage?.sender !== message.sender) {
        return true;
      }
      return false;
    };

    const isEndTextMessage = () => {
      if (
        isLastMessage &&
        previousMessage?.sender === message.sender &&
        previousMessage?.content.type === 'text'
      ) {
        return true;
      }
      if (
        nextMessage?.content.type === 'emojiOrSticker' &&
        message.content.type == 'text' &&
        nextMessage?.sender === message.sender
      ) {
        return true;
      }
      if (nextMessage?.sender !== message.sender) {
        return true;
      }
      return false;
    };

    const isMidTextMessage = () => {
      if (!isEndTextMessage() && !isStartTextMessage()) {
        return true;
      }
      return false;
    };

    return (
      <>
        {displayMessage}
        <div
          className="flex items-start gap-3"
          title={formatSmartTimestamp(message.createdAt)}
        >
          <div className="flex w-full max-w-2xl flex-col items-start pr-14">
            {message.content.type === 'text' && (
              <div
                className={cn(
                  'rounded-xl border bg-card px-3 py-1 shadow-sm dark:bg-muted',
                  {
                    'rounded-r-2xl rounded-bl-lg rounded-tl-2xl':
                      isStartTextMessage(),
                    'rounded-r-2xl rounded-tl-lg rounded-bl-2xl':
                      isEndTextMessage(),
                    'rounded-l-lg rounded-r-2xl': isMidTextMessage(),
                    'rounded-2xl': isAloneTextMessage(),
                  }
                )}
              >
                <p className="whitespace-pre-line break-all text-sm leading-relaxed sm:text-[1rem]">
                  {message.content.text}
                </p>
              </div>
            )}
            {message.content.type === 'emojiOrSticker' && (
              <div>
                <p className="mb-1 -translate-x-1.5 text-5xl">
                  {message.content.emoji}
                </p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

TrafficBubble.displayName = 'TrafficBubble';
