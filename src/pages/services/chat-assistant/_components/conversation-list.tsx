import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Mock data
const conversations = [
  {
    id: 'demo-1',
    name: 'Messenger - [Demo]',
    lastMessage: 'Install Messenger',
    time: '18m',
    unread: false,
    avatar: 'M',
  },
  {
    id: 'john-doe',
    name: 'John Doe',
    lastMessage: 'I need help with my order',
    time: '1h',
    unread: true,
    avatar: 'JD',
  },
  {
    id: 'jane-smith',
    name: 'Jane Smith',
    lastMessage: 'When will my order arrive?',
    time: '3h',
    unread: false,
    avatar: 'JS',
  },
];

interface ConversationListProps {
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
}

export function ConversationList({
  selectedConversation,
  onSelectConversation,
}: ConversationListProps) {
  const [filter, setFilter] = useState('1 Open');

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
            <DropdownMenuItem onClick={() => setFilter('1 Open')}>
              1 Open
            </DropdownMenuItem>
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

      {/* Conversation List */}
      <div className="site-scrollbar flex-1 overflow-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            className={cn(
              'flex w-full items-center gap-3 border-b px-3 py-2 text-left transition-colors',
              selectedConversation === conversation.id
                ? 'bg-muted/50'
                : 'hover:bg-muted/20'
            )}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="relative shrink-0">
              <Avatar className="size-7">
                <AvatarFallback className="text-sm">
                  {conversation.avatar}
                </AvatarFallback>
              </Avatar>
              {conversation.unread && (
                <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-blue-500 ring-1 ring-background"></span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-sm font-medium truncate',
                    conversation.unread && 'font-semibold'
                  )}
                >
                  {conversation.name}
                </span>
                <span className="ml-1 shrink-0 text-xs text-muted-foreground">
                  {conversation.time}
                </span>
              </div>
              <p
                className={cn(
                  'text-xs truncate text-muted-foreground',
                  conversation.unread && 'text-foreground'
                )}
              >
                {conversation.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
