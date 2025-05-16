import { ChevronDown } from 'lucide-react';
import { useState, memo } from 'react';

import type { ConversationListItem } from '@/app/services/chat-assistant/chat-assistant.type';

import { useAuthStore } from '@/app/auth/auth.store';
import { useProjectServicesQuery } from '@/app/project/project.hooks';
import { useConversationListQuery } from '@/app/services/chat-assistant/chat-assistant.hooks';
import FetchErrorView from '@/components/fetch-error-view';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ConversationItemView } from './conversation-item';
import ConversationItemSkeleton from './conversation-item-skeleton';
import NoConversationMessage from './no-conversation-message';

export const ConversationList = memo(() => {
  const [filter, setFilter] = useState('All');
  const { getCurrentProject } = useAuthStore();
  const { id: projectId } = getCurrentProject() ?? {};

  const { data: projectServices } = useProjectServicesQuery(projectId);

  const {
    data: conversations,
    isLoading: isConversationsLoading,
    // isFetching: isConversationsFetching,
    error: conversationsError,
    refetch: refetchConversations,
  } = useConversationListQuery(
    projectServices?.chat_assistant?.chatAssistantId ?? '',
    !!projectServices?.chat_assistant?.chatAssistantId
  );

  const isLoading = isConversationsLoading;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-3 pb-3 pt-5">
        <h1 className="m-0 text-xl font-semibold">Inbox</h1>
      </div>

      {/* Filters - Simplified */}
      <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 justify-start px-3 text-sm"
            >
              {filter} <ChevronDown className="ml-1 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setFilter('All')}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter('Unread')}>
              Unread
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 px-3 text-sm">
              Oldest activity <ChevronDown className="ml-1 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Newest activity</DropdownMenuItem>
            <DropdownMenuItem>Oldest activity</DropdownMenuItem>
            <DropdownMenuItem>Recently updated</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="site-scrollbar flex-1 overflow-auto">
        <div>
          {isLoading ? (
            <ConversationItemSkeleton count={8} />
          ) : (
            <>
              {conversationsError || !conversations ? (
                <div className="py-20">
                  <FetchErrorView
                    title="conversations"
                    errorActions={{
                      primary: {
                        label: 'Refresh',
                        onClick: refetchConversations,
                      },
                    }}
                  />
                </div>
              ) : conversations.length > 0 ? (
                conversations.map((conversation) => (
                  <ConversationItemView
                    key={conversation.id}
                    conversation={conversation as ConversationListItem}
                  />
                ))
              ) : (
                <NoConversationMessage />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});

ConversationList.displayName = 'ConversationList';
