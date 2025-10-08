import { ChevronLeft, Clock, Star } from 'lucide-react';
import { memo } from 'react';
import { Link, useParams } from 'react-router';

import type { ConversationDetail } from '@/app/features/chat-assistant/chat-assistant.type';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-mobile';
import { formatSmartTimestamp } from '@/lib/time';

export const ChatHeader = memo(
  ({ conversation }: { conversation: ConversationDetail }) => {
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const params = useParams();

    const projectId = params.projectId;

    return (
      <div className="flex items-center justify-between border-b px-3 py-2 pt-3 sm:px-4">
        {/* Left Side */}
        <div className="flex min-w-0 items-center gap-1.5">
          {!isDesktop && (
            <Link to={`/${projectId}/live-desk/live-chat`}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {}}
                className="shrink-0"
              >
                <ChevronLeft className="size-4" />
              </Button>
            </Link>
          )}

          <div className="flex items-center gap-2">
            <Avatar className="size-8 shadow-sm">
              <AvatarFallback>
                {conversation?.ticketId.replace(/tkt_/, '')}
              </AvatarFallback>
              <AvatarImage src={undefined} />
            </Avatar>
            <div className="flex flex-col">
              <h2 className="truncate text-base font-medium">
                {conversation?.ticketId || 'Messenger'}
              </h2>
              {conversation?.updatedAt && (
                <p className="truncate text-xs">
                  {formatSmartTimestamp(conversation?.updatedAt)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Star className="size-4" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Clock className="size-4" />
          </Button>
        </div>
      </div>
    );
  }
);

ChatHeader.displayName = 'ChatHeader';
