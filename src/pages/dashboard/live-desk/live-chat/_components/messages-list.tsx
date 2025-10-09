import { memo, useEffect } from 'react';
import { useParams } from 'react-router';

import type { Message } from '@/app/features/live-desk/live-desk.type';

import { AssistantMemberBubble } from './assistant-member-bubble';
import { TrafficBubble } from './traffic-bubble';

export type MessagesListProps = {
  messages: Message[];
  handleScrollToBottom: () => void;
  setDoneFirstScrollToBottom: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MessageView = memo(
  ({
    message,
    previousMessage,
    nextMessage,
    isLastMessage,
    isFirstMessage,
  }: {
    message: Message;
    previousMessage: Message | null;
    nextMessage: Message | null;
    isLastMessage: boolean;
    isFirstMessage: boolean;
  }) => {
    return (
      <div key={message.id}>
        {message.sender === 'assistant' ? (
          <AssistantMemberBubble
            message={message}
            nextMessage={nextMessage}
            previousMessage={previousMessage}
            isLastMessage={isLastMessage}
            isFirstMessage={isFirstMessage}
          />
        ) : (
          <TrafficBubble
            message={message}
            isLastMessage={isLastMessage}
            previousMessage={previousMessage}
            nextMessage={nextMessage}
            isFirstMessage={isFirstMessage}
          />
        )}
      </div>
    );
  }
);

MessageView.displayName = 'MessageView';

export const MessagesList = memo(
  ({
    messages,
    handleScrollToBottom,
    setDoneFirstScrollToBottom,
  }: MessagesListProps) => {
    const { ticketId } = useParams();

    useEffect(() => {
      if (ticketId) {
        handleScrollToBottom();
        setDoneFirstScrollToBottom(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticketId]);

    return (
      <>
        {messages.map((msg, i) => (
          <MessageView
            key={msg.id}
            message={msg}
            previousMessage={messages[i - 1] ?? null}
            nextMessage={messages[i + 1] ?? null}
            isLastMessage={i === messages.length - 1}
            isFirstMessage={i === 0}
          />
        ))}
      </>
    );
  }
);

MessagesList.displayName = 'MessagesList';
