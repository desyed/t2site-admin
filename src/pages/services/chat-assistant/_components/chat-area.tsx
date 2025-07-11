import { useInfiniteQuery } from '@tanstack/react-query';
import { ArrowDown } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';

import type {
  ApiMessagesResponse,
  ConversationDetail,
} from '@/app/services/chat-assistant/chat-assistant.type';

import { fetchConversationMessagesPage } from '@/app/services/chat-assistant/chat-assistant.fetch';
import { useConversationDetailQuery } from '@/app/services/chat-assistant/chat-assistant.hooks';
import { chatAreaQueryKey } from '@/app/services/chat-assistant/chat-assistant.keys';
import FetchErrorView from '@/components/fetch-error-view';
import { Button } from '@/components/ui/button';

import { ChatHeader } from './chat-header';
import { ChatHeaderSkeleton } from './chat-header-skeleton';
import { ChatToolbar } from './chat-toolbar';
import { MessageInputAreaSkeleton } from './message-input-area-skeleton';
import { MessageSkeletonList } from './message-skeleton-list';
import { MessagesList } from './messages-list';
import NoMessages from './no-messages';

export function ChatArea() {
  const { ticketId } = useParams();
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [doneFirstScrollToBottom, setDoneFirstScrollToBottom] = useState(false);

  const [isUserFacingBottom, setIsUserFacingBottom] = useState(false);
  const [isUserFacingTop, setIsUserFacingTop] = useState(false);

  const {
    data: conversation,
    error: conversationError,
    isLoading: isConversationLoading,
  } = useConversationDetailQuery(ticketId as string);

  const {
    data,
    isLoading: isMessagesLoading,
    error: messagesError,
    refetch: refetchMessages,
    isFetchingPreviousPage,
    fetchPreviousPage,
  } = useInfiniteQuery<ApiMessagesResponse>({
    queryKey: chatAreaQueryKey(ticketId ?? ''),
    queryFn: ({ pageParam = undefined }) => {
      return fetchConversationMessagesPage(ticketId as string, {
        prevCursor: pageParam as string | undefined,
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.nextCursor;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.pagination.prevCursor;
    },
    initialPageParam: undefined,
    enabled: !!ticketId,
    networkMode: 'offlineFirst',
    staleTime: Infinity,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const isLoading = isConversationLoading || isMessagesLoading;

  const messages = useMemo(() => {
    return data?.pages.flatMap((page) => page.data);
  }, [data]);

  useEffect(() => {
    if (data?.pages) {
      const lastPage = data.pages[0];
      if (lastPage) {
        setHasMoreMessages(lastPage.pagination.hasMore);
      }
    }
  }, [data?.pages]);

  const latestPage = data?.pages[data?.pages.length - 1];

  const isNearTop = useCallback(() => {
    if (!scrollContainerRef.current) return false;
    const { scrollTop } = scrollContainerRef.current;
    const threshold = 20;
    return scrollTop < threshold;
  }, []);

  const isFarBottom = useCallback(() => {
    if (!scrollContainerRef.current) return false;
    const { scrollHeight, clientHeight, scrollTop } =
      scrollContainerRef.current;
    const threshold = 150;
    return scrollHeight - scrollTop - clientHeight > threshold;
  }, []);

  const isNearBottom = useCallback(() => {
    if (!scrollContainerRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const threshold = 200;
    return scrollHeight - scrollTop - clientHeight < threshold;
  }, []);

  useEffect(() => {
    if (latestPage && !isLoading && bottomRef.current && isNearBottom()) {
      bottomRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [latestPage, isLoading, isNearBottom]);

  const handleScrollToBottom = useCallback(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      });
    }
  }, [bottomRef]);

  const handleFirstScrollToBottom = useCallback(() => {
    handleScrollToBottom();
    if (!doneFirstScrollToBottom) {
      setTimeout(() => {
        setDoneFirstScrollToBottom(true);
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleScrollToBottom]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    const scrollHandler = () => {
      setIsUserFacingBottom(isFarBottom());
      setIsUserFacingTop(isNearTop());
    };
    scrollContainer.addEventListener('scroll', scrollHandler);
    return () => {
      scrollContainer.removeEventListener('scroll', scrollHandler);
    };
  }, [isFarBottom, isNearTop]);

  useEffect(() => {
    if (
      isUserFacingTop &&
      hasMoreMessages &&
      !isFetchingPreviousPage &&
      doneFirstScrollToBottom
    ) {
      fetchPreviousPage();
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 24;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserFacingTop, hasMoreMessages, isFetchingPreviousPage]);

  if (!conversation) {
    return <div>No conversation</div>;
  }

  return (
    <div className="relative flex h-full flex-col">
      {isLoading ? (
        <ChatHeaderSkeleton />
      ) : (
        <ChatHeader conversation={conversation as ConversationDetail} />
      )}

      {isLoading ? (
        <div className="site-scrollbar flex-1 overflow-y-auto bg-neutral-100 p-4 dark:bg-background">
          <MessageSkeletonList />
        </div>
      ) : messagesError || !messages ? (
        <div className="flex flex-1 items-center justify-center p-5">
          <FetchErrorView
            title="messages"
            errorActions={{
              primary: { label: 'Refresh', onClick: refetchMessages },
            }}
          />
        </div>
      ) : messages.length > 0 ? (
        <div
          className="site-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto bg-neutral-100 py-5 pl-4 pr-1 dark:bg-background"
          ref={scrollContainerRef}
        >
          {isFetchingPreviousPage && <MessageSkeletonList />}
          <div className="flex flex-1 flex-col gap-2 ">
            <MessagesList
              messages={messages}
              handleScrollToBottom={handleFirstScrollToBottom}
              setDoneFirstScrollToBottom={setDoneFirstScrollToBottom}
            />
            <div ref={bottomRef} />
          </div>
        </div>
      ) : (
        <NoMessages ticketId={ticketId as string} />
      )}
      <Button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full shadow-md [&_svg]:size-5"
        onClick={handleScrollToBottom}
        size="icon"
        variant="outline"
        style={{
          bottom: isUserFacingBottom ? '11rem' : '0px',
          transition: 'bottom 0.2s ease-in-out',
        }}
      >
        <ArrowDown />
      </Button>
      {isLoading ? (
        <MessageInputAreaSkeleton />
      ) : (
        !conversationError &&
        !messagesError && (
          <ChatToolbar
            conversation={conversation}
            onSendEmojiMessage={() => {
              handleScrollToBottom();
            }}
            onSendTextMessage={() => {
              handleScrollToBottom();
            }}
          />
        )
      )}
    </div>
  );
}
