import { Plus, Triangle } from 'lucide-react';

import { MessageIcon } from '@/components/icons';
import { Button } from '@/components/site-button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import type { ChatMessage } from './chat-conversation';

import ChatConversation from './chat-conversation';

const conversation: ChatMessage[] = [
  {
    id: 1,
    type: 'bot',
    avatar: '/t2-chat-icon-light.svg',
    message: "Hi! I'm t2chat, an AI Assistant. Ask me anything about t2chat!",
  },
  {
    id: 2,
    type: 'user-options',
    options: [
      { id: 'opt1', text: 'What is t2chat?' },
      { id: 'opt2', text: 'Why should I choose t2chat?' },
      { id: 'opt3', text: 'How do I set up an AI Chatbot?' },
      { id: 'opt4', text: 'I have a different question?' },
    ],
  },
];

const ChatWidgetPreview = () => {
  return (
    <div className="w-[400px] overflow-hidden rounded-xl border bg-gradient-to-b from-[var(--chat-bg)] to-[#F5F5F5] shadow">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 text-primary">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex size-11 items-center justify-center rounded-full bg-[var(--chat-badge)]`}
          >
            <div className="mt-[2px] size-3/5">
              <MessageIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Conversation */}
      <div className="px-2">
        <div className="rounded-t-xl bg-[#F5F5F5] p-4">
          <ChatConversation conversation={conversation} />
        </div>
      </div>

      {/* Chat Toolbar */}
      <div className="bg-[#E6E6E6] pb-2 pt-4">
        <div className="px-2 pb-1 sm:px-3 sm:pb-2">
          <div className="flex items-center gap-2 overflow-hidden rounded-[28px] border bg-background">
            <div className={cn('pl-2', 'order-1 w-fit')}>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'size-8 rounded-full text-muted-foreground hover:text-foreground'
                )}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <Input
              className="order-2 flex-1 border-none focus-visible:shadow-none focus-visible:outline-none"
              placeholder="Write a message..."
              readOnly
            />

            <div className="order-3 flex items-center gap-2 px-2">
              <Button
                size="icon"
                className="size-7 gap-2 rounded-full bg-[var(--chat-fg)]"
              >
                <Triangle className="ml-0.5 size-4 rotate-90" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatWidgetPreview;
