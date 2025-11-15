import { Plus, Triangle } from 'lucide-react';

import type { Message } from '@/app/features/live-desk/live-desk.type';

import { ArrowRightOutline, MessageIcon } from '@/components/icons';
import { Button } from '@/components/site-button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { MessageView } from '@/pages/dashboard/live-desk/live-chat/_components/messages-list';

export const messages: Message[] = [
  {
    id: 't2s-msg_34b91224-7724-47ff-a6b6-eed8999d75de',
    conversationId: 't2s-conv_a2c9fd34-c98a-4bb8-b89a-0368f739c6de',
    cursor: '01KA42RN0SGAKHYG2JJF2FM2TT',
    content: {
      text: 'Hi! I need some help with logging into my account.',
      type: 'text',
    },
    sender: 'traffic',
    assistantMemberId: '',
    trafficId: 't2s-trf_demo_001',
    createdAt: '2025-11-15T15:39:57.834Z',
    traffic: {
      id: 't2s-trf_demo_001',
      name: 'Guest User',
      avatar: null,
    },
    assistantMember: {
      email: 'support@t2devs.com',
      role: 'owner',
      user: {
        id: 't2s-usr_demo_001',
        name: 'Kawsar Ahmed',
        avatar:
          'https://res.cloudinary.com/df25cfhp4/image/upload/v1761985633/profile/avatar/t2s-usr_ba628096-c428-4e66-9b33-c9815a1f706b.webp',
        email: 'kawsarahmed130@gmail.com',
      },
    },
  },

  {
    id: 't2s-msg_a34cad3b-c653-4a3f-92b2-6af0ecfedf52',
    conversationId: 't2s-conv_a2c9fd34-c98a-4bb8-b89a-0368f739c6de',
    cursor: '01KA42S5F3ME46KFP52KAS1FHH',
    content: {
      text: "Sure! I'd be happy to help. Can you provide your email address?",
      type: 'text',
    },
    sender: 'assistant',
    assistantMemberId: 't2s-prjmem_demo_001',
    trafficId: 't2s-trf_demo_001',
    createdAt: '2025-11-15T15:40:14.684Z',
    traffic: {
      id: 't2s-trf_demo_001',
      name: 'Guest User',
      avatar: null,
    },
    assistantMember: {
      email: 'support@t2devs.com',
      role: 'owner',
      user: {
        id: 't2s-usr_demo_001',
        name: 'Kawsar Ahmed',
        avatar:
          'https://res.cloudinary.com/df25cfhp4/image/upload/v1761985633/profile/avatar/t2s-usr_ba628096-c428-4e66-9b33-c9815a1f706b.webp',
        email: 'kawsarahmed130@gmail.com',
      },
    },
  },

  {
    id: 't2s-msg_af067b15-1579-404a-a0ce-7da1bde65a79',
    conversationId: 't2s-conv_a2c9fd34-c98a-4bb8-b89a-0368f739c6de',
    cursor: '01KA42SNPTS98MSDXCNJEYFC3F',
    content: {
      text: 'My email is demo-support@example.com',
      type: 'text',
    },
    sender: 'traffic',
    assistantMemberId: '',
    trafficId: 't2s-trf_demo_001',
    createdAt: '2025-11-15T15:40:31.315Z',
    traffic: {
      id: 't2s-trf_demo_001',
      name: 'Guest User',
      avatar: null,
    },
    assistantMember: {
      email: 'support@t2devs.com',
      role: 'owner',
      user: {
        id: 't2s-usr_demo_001',
        name: 'Kawsar Ahmed',
        avatar:
          'https://res.cloudinary.com/df25cfhp4/image/upload/v1761985633/profile/avatar/t2s-usr_ba628096-c428-4e66-9b33-c9815a1f706b.webp',
        email: 'kawsarahmed130@gmail.com',
      },
    },
  },

  {
    id: 't2s-msg_2e5d0b3b-6e58-49f3-a773-78f40b79f63e',
    conversationId: 't2s-conv_a2c9fd34-c98a-4bb8-b89a-0368f739c6de',
    cursor: '01KA42TAK678MEDC5Y452KCH34',
    content: {
      text: 'Great! We will get back to you shortly.',
      type: 'text',
    },
    sender: 'assistant',
    assistantMemberId: 't2s-prjmem_demo_001',
    trafficId: 't2s-trf_demo_001',
    createdAt: '2025-11-15T15:40:52.705Z',
    traffic: {
      id: 't2s-trf_demo_001',
      name: 'Guest User',
      avatar: null,
    },
    assistantMember: {
      email: 'support@t2devs.com',
      role: 'owner',
      user: {
        id: 't2s-usr_demo_001',
        name: 'Kawsar Ahmed',
        avatar:
          'https://res.cloudinary.com/df25cfhp4/image/upload/v1761985633/profile/avatar/t2s-usr_ba628096-c428-4e66-9b33-c9815a1f706b.webp',
        email: 'kawsarahmed130@gmail.com',
      },
    },
  },
];

const ChatWidgetPreview = () => {
  return (
    <div className="w-[400px] overflow-hidden rounded-xl">
      {/* Chat Header */}
      <div className="bg-chat-primary/15 flex items-center justify-between border-b border-border/30 px-3.5 py-3 text-primary">
        <div className="flex items-center gap-2.5">
          <div>
            <div
              className={`bg-chat-primary flex size-11 items-center justify-center rounded-full`}
            >
              <div className="mt-[2px] size-3/5">
                <MessageIcon />
              </div>
            </div>
          </div>
          <div className="mt-[-4px]">
            <h3 className="font-medium">Support Assistant</h3>
            <p className="flex items-center text-xs">
              <span
                className={`mr-1.5 inline-block size-2 rounded-full bg-green-500`}
              ></span>
              Online | Typically replies in a few minutes
            </p>
          </div>
        </div>
        <button className="cursor-pointer transition-transform active:scale-90">
          <ArrowRightOutline className="size-6" />
        </button>
      </div>

      {/* Chat Section */}
      <div className="bg-gray-100 p-4">
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
      </div>

      {/* Chat Toolbar */}
      <div className="relative bg-gray-200 pb-2 pt-4">
        <div className="px-2 pb-1 sm:px-3 sm:pb-2">
          <div className="relative">
            {/* Reply Dropdown */}

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 overflow-hidden rounded-[28px] border bg-background py-1">
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
                  <div className="relative">
                    <Button
                      size="icon"
                      className="size-8 gap-2 rounded-full transition-colors"
                    >
                      <Triangle className="ml-0.5 size-4 rotate-90" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatWidgetPreview;
