import { Plus, Triangle } from 'lucide-react';

import { ArrowRightOutline, MessageIcon } from '@/components/icons';
import { Button } from '@/components/site-button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

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

      {/* Inbox Section */}

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
