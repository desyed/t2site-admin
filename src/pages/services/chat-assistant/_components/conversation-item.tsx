import { memo, useEffect, useState } from 'react';
import { Link, useNavigate, useNavigation, useParams } from 'react-router';

import type { ConversationListItem } from '@/app/services/chat-assistant/chat-assistant.type';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatSmartTimestamp } from '@/lib/time';
import { cn, delay } from '@/lib/utils';

export const ConversationItem = memo(
  ({ conversation }: { conversation: ConversationListItem }) => {
    const { ticketId: currentTicketId } = useParams();
    const navigation = useNavigation();

    const [conversationItem, setConversationItem] =
      useState<ConversationListItem>(conversation);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
      (async () => {
        await delay(300);
        if (
          navigation.state != 'loading' &&
          conversationItem.unread &&
          clicked
        ) {
          setConversationItem({
            ...conversationItem,
            unread: false,
          });
        }
      })();
    }, [clicked, conversationItem, currentTicketId, navigation.state]);

    return (
      <Link
        to={`/services/chat-assistant/${conversationItem.ticketId}`}
        key={conversationItem.ticketId}
        onClick={() => setClicked(true)}
      >
        <button
          className={cn(
            'flex w-full items-center gap-3 border-b px-3 py-2 text-left',
            currentTicketId === conversationItem.ticketId
              ? 'dark:bg-accent/50 bg-accent'
              : 'hover:bg-accent/20'
          )}
        >
          <div className="relative shrink-0">
            <Avatar className="size-7">
              <AvatarFallback className="text-sm">
                {conversationItem.ticketId.replace('tkt_', '')}
              </AvatarFallback>
            </Avatar>
            {conversationItem.unread && (
              <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-blue-500 ring-1 ring-background"></span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  'text-sm font-medium truncate uppercase max-w-48 '
                )}
              >
                {conversationItem.ticketId}
              </span>

              <span
                className={cn(
                  'ml-1 shrink-0 text-xs text-muted-foreground',
                  conversationItem.unread && 'font-semibold text-foreground'
                )}
              >
                {formatSmartTimestamp(conversationItem.updatedAt)}
              </span>
            </div>

            {conversation.latestMessage ? (
              <>
                {' '}
                {conversationItem.latestMessage?.content.type === 'text' && (
                  <p
                    className={cn(
                      'text-xs truncate text-muted-foreground',
                      conversationItem.unread && 'text-foreground font-semibold'
                    )}
                  >
                    {conversationItem.latestMessage.sender === 'assistant'
                      ? 'Sent: '
                      : ''}
                    {conversationItem.latestMessage.content.text}
                  </p>
                )}
                {conversationItem.latestMessage?.content.type ===
                  'emojiOrSticker' && (
                  <p
                    className={cn(
                      'text-xs truncate text-muted-foreground',
                      conversationItem.unread && 'text-foreground font-semibold'
                    )}
                  >
                    {conversationItem.latestMessage.sender === 'assistant'
                      ? 'Sent: '
                      : ''}
                    {conversationItem.latestMessage.content.emoji}
                  </p>
                )}
              </>
            ) : (
              <p className="truncate text-xs text-muted-foreground">
                No messages yet
              </p>
            )}
          </div>
        </button>
      </Link>
    );
  }
);

ConversationItem.displayName = 'ConversationItem';
