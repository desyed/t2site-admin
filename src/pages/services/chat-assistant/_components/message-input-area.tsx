'use client';

import type React from 'react';

import {
  MoreHorizontal,
  Wand2,
  Paperclip,
  Smile,
  SendIcon,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { EnhancedTextarea } from './enhanced-textarea';
import { MessageFieldMenu } from './message-field-menu';
import { SendOptions } from './send-options';

interface MessageInputAreaProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
}

export function MessageInputArea({
  message,
  setMessage,
  onSend,
}: MessageInputAreaProps) {
  const [showSendOptions, setShowSendOptions] = useState(false);
  const [showMessageFieldMenu, setShowMessageFieldMenu] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="bg-neutral-100 p-2 dark:bg-background sm:p-3">
      <div className="relative overflow-hidden rounded-lg border shadow-sm focus-within:border-yellow-500/60 focus-within:dark:border-primary/20">
        {/* Reply Dropdown */}

        <div className="bg-white dark:bg-background">
          <EnhancedTextarea
            value={message}
            onChange={setMessage}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Write a message..."
            className="site-scrollbar min-h-[40px] border-0 bg-transparent p-3 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            maxHeight={200}
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between bg-white p-2 dark:bg-background">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground"
            >
              <Paperclip className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground"
            >
              <Smile className="size-4" />
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-foreground"
                onClick={() => setShowMessageFieldMenu(!showMessageFieldMenu)}
              >
                <MoreHorizontal className="size-4" />
              </Button>
              {showMessageFieldMenu && (
                <div className="absolute bottom-full left-0 z-50 mb-2">
                  <MessageFieldMenu
                    onClose={() => setShowMessageFieldMenu(false)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground"
            >
              <Wand2 className="size-4" />
            </Button>
            <div className="relative">
              <Button
                onClick={onSend}
                disabled={!message.trim()}
                size="icon"
                className="gap-2 transition-colors"
              >
                <SendIcon className="size-4" />
              </Button>
              {showSendOptions && (
                <div className="absolute bottom-full right-0 z-50 mb-2">
                  <SendOptions onClose={() => setShowSendOptions(false)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
