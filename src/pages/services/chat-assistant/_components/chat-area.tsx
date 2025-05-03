import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router';

import type { ConversationDetail } from '@/app/services/chat-assistant/chat-assistant.type';

import { useConversationDetailQuery } from '@/app/services/chat-assistant/chat-assistant.hooks';

import ChatHeader from './chat-header';
import { ChatToolbar } from './chat-toolbar';
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

// Update ChatArea component header
export function ChatArea() {
  const { ticketId } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: conversation } = useConversationDetailQuery(ticketId as string);

  // Memoize currentMessages to prevent unnecessary re-renders
  const currentMessages = useMemo(() => {
    return ticketId
      ? conversationMessages[ticketId as keyof typeof conversationMessages]
      : [];
  }, [ticketId]);

  // const conversation = ticketId
  //   ? conversationData[ticketId as keyof typeof conversationData]
  //   : { title: 'Unknown', subtitle: '' };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [currentMessages]);

  return (
    <div className="relative flex h-full flex-col">
      {/* Chat Header */}
      <ChatHeader conversation={conversation as ConversationDetail} />

      {/* Messages Area */}
      <div className="site-scrollbar flex-1 overflow-y-auto bg-neutral-100 p-4 dark:bg-background">
        {/* {currentMessages.map((msg) => (
          <div key={msg.id} className="mb-6">
            {msg.sender === 'system' ? (
              <div className="flex flex-col items-center">
                <div className="max-w-[70%] p-3 text-center text-sm text-muted-foreground ">
                  <p>{msg.content}</p>
                </div>
                <span className="mt-1 text-xs text-muted-foreground/70">
                  {msg.time}
                </span>
              </div>
            ) : msg.sender === 'admin' ? (
              <div className="flex flex-row-reverse items-start gap-3">
                <Avatar className="size-8 border shadow-sm">
                  <AvatarFallback>{msg.avatar}</AvatarFallback>
                  <AvatarImage src={undefined} />
                </Avatar>
                <div className="flex max-w-[60%] flex-col items-end">
                  <div className="rounded-lg bg-yellow-300 p-3 text-primary-foreground shadow-sm dark:bg-yellow-400 selection:dark:bg-yellow-600/40 selection:dark:text-background">
                    <p className="whitespace-pre-line break-all text-sm leading-relaxed">
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
            ) : (
              // Customer message (left aligned)
              <div className="flex items-start gap-3">
                <Avatar className="size-8 border shadow-sm">
                  <AvatarFallback>{msg.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex max-w-[60%] flex-col">
                  <div className="rounded-lg border bg-muted p-3 shadow-sm">
                    <p className="whitespace-pre-line break-all text-sm leading-relaxed">
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
        ))} */}
        <div ref={messagesEndRef} />
      </div>
      <ChatToolbar />
    </div>
  );
}
