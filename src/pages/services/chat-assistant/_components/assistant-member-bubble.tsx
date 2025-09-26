import { memo, useMemo } from 'react';

import type { Message } from '@/app/services/chat-assistant/chat-assistant.type';

import { useAuthStore } from '@/app/auth/auth.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  formatMessageRelativeTime,
  formatSmartTimestamp,
  timeGap,
} from '@/lib/time';
import { cn } from '@/lib/utils';

import { DisplayTime } from './display-time';

export const UserAvatar = memo(
  ({
    name,
    avatar,
    userId,
  }: {
    name: string;
    avatar: string;
    userId: string;
  }) => {
    const currentUser = useAuthStore((state) => state.user);
    return (
      <Avatar
        className="size-6 border shadow-sm transition-opacity duration-200"
        title={currentUser?.id === userId ? 'You' : name}
      >
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.userId === nextProps.userId &&
      prevProps.name === nextProps.name &&
      prevProps.avatar === nextProps.avatar
    );
  }
);

UserAvatar.displayName = 'UserAvatar';

const thirtyMinutes = 1000 * 60 * 30;

export const AssistantMemberBubble = memo(
  ({
    message,
    nextMessage,
    previousMessage,
    isLastMessage,
    isFirstMessage,
  }: {
    message: Message;
    nextMessage: Message | null;
    previousMessage: Message | null;
    isLastMessage: boolean;
    isFirstMessage: boolean;
  }) => {
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
      if (previousMessage?.assistantMemberId !== message.assistantMemberId) {
        return <DisplayTime timestamp={message.createdAt} />;
      }
      if (previousMessage?.sender !== message.sender) {
        return <DisplayTime timestamp={message.createdAt} />;
      }

      return null;
    }, [
      isFirstMessage,
      timeDelay,
      previousMessage?.assistantMemberId,
      previousMessage?.sender,
      message.assistantMemberId,
      message.sender,
      message.createdAt,
    ]);

    const isTextMessonAlone = () => {
      if (timeDelay && isLastMessage) {
        return true;
      }

      if (
        previousMessage?.assistantMemberId === message.assistantMemberId &&
        nextMessage?.content.type === 'emojiOrSticker'
      ) {
        return false;
      }

      if (
        timeDelay &&
        nextMessage?.createdAt &&
        timeGap(nextMessage?.createdAt, message?.createdAt) > thirtyMinutes
      ) {
        return true;
      }

      if (
        nextMessage?.content.type === 'emojiOrSticker' &&
        previousMessage?.content.type === 'emojiOrSticker'
      ) {
        return true;
      }

      if (
        message.assistantMemberId !== previousMessage?.assistantMemberId &&
        message.content.type === 'text' &&
        nextMessage?.content.type === 'emojiOrSticker'
      ) {
        return true;
      }
      if (
        message.assistantMemberId !== nextMessage?.assistantMemberId &&
        message.content.type === 'text' &&
        previousMessage?.content.type === 'emojiOrSticker'
      ) {
        return true;
      }

      if (
        message.assistantMemberId !== nextMessage?.assistantMemberId &&
        message.assistantMemberId !== previousMessage?.assistantMemberId
      ) {
        return true;
      }

      return false;
    };

    const isStartTextMessage = () => {
      if (isTextMessonAlone()) {
        return false;
      }
      if (
        message.assistantMemberId === previousMessage?.assistantMemberId &&
        previousMessage?.content.type === 'emojiOrSticker'
      ) {
        return true;
      }
      if (message.assistantMemberId !== previousMessage?.assistantMemberId) {
        return true;
      }
      if (timeDelay) {
        return true;
      }
      return false;
    };

    const isLastTextMessage = () => {
      if (isTextMessonAlone()) {
        return false;
      }
      if (
        previousMessage?.assistantMemberId === message.assistantMemberId &&
        nextMessage?.content.type === 'emojiOrSticker'
      ) {
        return true;
      }
      return message.assistantMemberId !== nextMessage?.assistantMemberId;
    };

    const isMidTextMessage = () => {
      if (isTextMessonAlone()) {
        return false;
      }
      if (
        message.assistantMemberId === previousMessage?.assistantMemberId &&
        message.assistantMemberId === nextMessage?.assistantMemberId &&
        previousMessage?.content.type === 'text' &&
        nextMessage?.content.type === 'text'
      ) {
        return true;
      }
      return false;
    };

    return (
      <>
        {displayMessage}
        <div className="flex flex-col items-end">
          <div
            className={cn('flex flex-row-reverse items-end gap-2', {
              'opacity-50': message.optimistic?.failed,
            })}
            title={formatSmartTimestamp(message.createdAt)}
          >
            <div
              className={cn('-translate-y-1', {
                '-translate-y-1.5': message.content.type === 'emojiOrSticker',
              })}
            >
              {message.assistantMemberId !== nextMessage?.assistantMemberId ? (
                <UserAvatar
                  key={message.assistantMember.user.id}
                  name={message.assistantMember?.user?.name}
                  avatar={message.assistantMember?.user?.avatar}
                  userId={message.assistantMember.user.id ?? ''}
                />
              ) : (
                <div className="size-6 rounded-full" />
              )}
            </div>
            <div className="flex w-full max-w-2xl flex-col items-end pl-14">
              {message.content.type === 'text' && (
                <div
                  className={cn(
                    'rounded-xl bg-yellow-300 px-3 py-1 text-primary-foreground shadow-sm dark:bg-yellow-300 selection:dark:bg-yellow-600/40 selection:dark:text-background',
                    {
                      'rounded-l-2xl rounded-br-2xl rounded-tr-lg':
                        isLastTextMessage(),
                      'rounded-l-2xl rounded-br-lg rounded-tr-2xl':
                        isStartTextMessage(),
                      'rounded-l-2xl rounded-r-lg': isMidTextMessage(),
                      'rounded-2xl': isTextMessonAlone(),
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
                  <p className="mb-1 translate-x-2.5 text-5xl">
                    {message.content.emoji}
                  </p>
                </div>
              )}
            </div>
          </div>
          {message.optimistic?.failed ? (
            <span className="mr-10 text-xs text-destructive">
              {message.optimistic?.error}
            </span>
          ) : (
            isLastMessage && (
              <span className="mr-10 mt-px text-xs text-muted-foreground">
                {message.optimistic?.pending
                  ? 'Sending'
                  : `Sent ${formatMessageRelativeTime(message.createdAt)}`}
              </span>
            )
          )}
        </div>
      </>
    );
  }
);

AssistantMemberBubble.displayName = 'AssistantMemberBubble';
