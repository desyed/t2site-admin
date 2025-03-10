import {
  Star,
  Clock,
  MessageSquare,
  ChevronLeft,
  ChevronDown,
  Wand2,
} from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MessageInputArea } from './message-input-area';

const messages = [
  {
    id: 'msg-1',
    sender: 'customer',
    content:
      "Hello, I need help with my recent order #12345. It hasn't arrived yet.",
    time: '18m',
    avatar: 'C',
  },
  {
    id: 'msg-2',
    sender: 'system',
    content:
      'This is a demo message. It shows how a customer conversation from the Messenger will look in your Inbox. Conversations handled by Fin AI Agent will also appear here.',
    time: '17m',
    avatar: 'M',
  },
  {
    id: 'msg-3',
    sender: 'admin',
    content:
      "Hi there! I'd be happy to help you with your order. Let me check the status for you.",
    time: '15m',
    avatar: 'A',
  },
  {
    id: 'msg-4',
    sender: 'customer',
    content: 'Thank you. I was expecting it to arrive yesterday.',
    time: '12m',
    avatar: 'C',
  },
  {
    id: 'msg-5',
    sender: 'admin',
    content:
      'I see that your order is currently in transit. According to the tracking information, it should be delivered by tomorrow. Would you like me to send you the tracking link?',
    time: '10m',
    avatar: 'A',
  },
  {
    id: 'msg-6',
    sender: 'customer',
    content: 'Yes, please send me the tracking link.',
    time: '8m',
    avatar: 'C',
  },
  {
    id: 'msg-7',
    sender: 'admin',
    content:
      "Here's your tracking link: https://tracking.example.com/12345. Is there anything else I can help you with?",
    time: 'Just now',
    avatar: 'A',
  },
];

// Mock data for different conversations
const conversationMessages = {
  'demo-1': messages,
  'john-doe': [
    {
      id: 'john-1',
      sender: 'customer',
      content:
        "I need help with my order. It's been a week and I haven't received it yet.",
      time: '1h',
      avatar: 'JD',
    },
    {
      id: 'john-2',
      sender: 'admin',
      content:
        "I'm sorry to hear that. Can you provide your order number so I can look into this for you?",
      time: '45m',
      avatar: 'A',
    },
    {
      id: 'john-3',
      sender: 'customer',
      content: "Sure, it's #54321. I ordered a laptop last Monday.",
      time: '30m',
      avatar: 'JD',
    },
  ],
  'jane-smith': [
    {
      id: 'jane-1',
      sender: 'customer',
      content: 'When will my order arrive? I ordered a phone case 3 days ago.',
      time: '3h',
      avatar: 'JS',
    },
    {
      id: 'jane-2',
      sender: 'admin',
      content:
        'Let me check the status for you. Can you provide your order number?',
      time: '2h',
      avatar: 'A',
    },
    {
      id: 'jane-3',
      sender: 'customer',
      content: "It's #67890. Thanks for your help!",
      time: '1h',
      avatar: 'JS',
    },
  ],
};

// Add conversation data
const conversationData = {
  'demo-1': {
    title: 'Messenger',
    subtitle: '[Demo]',
  },
  'john-doe': {
    title: 'John Doe',
    subtitle: 'Customer Support',
  },
  'jane-smith': {
    title: 'Jane Smith',
    subtitle: 'Order #67890',
  },
};

interface ChatAreaProps {
  conversationId: string | null;
  onBackToList?: () => void;
  showBackButton?: boolean;
}

// Update ChatArea component header
export function ChatArea({
  conversationId,
  onBackToList,
  showBackButton = false,
}: ChatAreaProps) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    // Here you would typically send the message to your backend
    setMessage('');
  };

  // Memoize currentMessages to prevent unnecessary re-renders
  const currentMessages = useMemo(
    () =>
      conversationId
        ? conversationMessages[
            conversationId as keyof typeof conversationMessages
          ] || messages
        : [],
    [conversationId]
  );

  const conversation = useMemo(
    () =>
      conversationId
        ? conversationData[conversationId as keyof typeof conversationData]
        : null,
    [conversationId]
  );

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [currentMessages]);

  if (!conversationId) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <MessageSquare className="mx-auto size-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No conversation selected</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b  px-3 py-2 pt-3 sm:px-4">
        {/* Left Side */}
        <div className="flex min-w-0 items-center gap-1.5">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackToList}
              className="shrink-0"
            >
              <ChevronLeft className="size-4" />
            </Button>
          )}

          <div className="flex items-center gap-2">
            <Avatar className="size-8 shadow-sm">
              <AvatarFallback>{conversation?.title}</AvatarFallback>
              <AvatarImage src={undefined} />
            </Avatar>
            <div className="flex flex-col">
              <h2 className="truncate text-base font-medium ">
                {conversation?.title || 'Messenger'}
              </h2>
              {conversation?.subtitle && (
                <p className="truncate text-xs ">{conversation.subtitle}</p>
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

      {/* Messages Area */}
      <div className="site-scrollbar flex-1 overflow-y-auto bg-neutral-100 p-4 dark:bg-background">
        {currentMessages.map((msg) => (
          <div key={msg.id} className="mb-6">
            {msg.sender === 'system' ? (
              // System message (centered)
              <div className="flex flex-col items-center">
                <div className="max-w-[70%] p-3 text-center text-sm text-muted-foreground ">
                  <p>{msg.content}</p>
                </div>
                <span className="mt-1 text-xs text-muted-foreground/70">
                  {msg.time}
                </span>
              </div>
            ) : msg.sender === 'admin' ? (
              // Admin message (right aligned)
              <div className="flex flex-row-reverse items-start gap-3">
                <Avatar className="size-8 border shadow-sm">
                  <AvatarFallback>{msg.avatar}</AvatarFallback>
                  <AvatarImage src={undefined} />
                </Avatar>
                <div className="flex max-w-[65%] flex-col items-end">
                  <div className="rounded-lg bg-yellow-300 p-3 text-primary-foreground shadow-sm dark:bg-yellow-400 selection:dark:bg-yellow-600/40 selection:dark:text-background">
                    <p className="whitespace-pre-line break-all leading-relaxed ">
                      {msg.content}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground/70">
                      {msg.time}
                    </span>
                  </div>
                  {/* {showMessageToolbar && msg.sender === 'admin' && (
                    <div className="mt-1">
                      <MessageActions />
                    </div>
                  )} */}
                </div>
              </div>
            ) : (
              // Customer message (left aligned)
              <div className="flex items-start gap-3">
                <Avatar className="size-8 border shadow-sm">
                  <AvatarFallback>{msg.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex max-w-[65%] flex-col">
                  <div className="rounded-lg border bg-white p-3 shadow-sm dark:bg-card">
                    <p className="whitespace-pre-line break-all leading-relaxed ">
                      {msg.content}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground/70">
                      {msg.time}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {/* This empty div serves as a scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area - Now using the separate component */}
      <MessageInputArea
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
      />
    </div>
  );
}
// Enhanced Reply Dropdown Component
function ReplyDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs opacity-80 hover:opacity-100"
        >
          <MessageSquare className="mr-1 size-3" />
          Reply
          <ChevronDown className="ml-1 size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem>
          <MessageSquare className="mr-2 size-4" />
          Quick Reply
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Wand2 className="mr-2 size-4" />
          AI-Suggested Reply
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Reply in Thread</DropdownMenuItem>
        <DropdownMenuItem>Reply to Customer</DropdownMenuItem>
        <DropdownMenuItem>Forward Message</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
