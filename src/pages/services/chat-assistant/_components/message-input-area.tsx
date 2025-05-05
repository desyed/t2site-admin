'use client';

import type React from 'react';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Smile, SendIcon } from 'lucide-react';
import { memo, useState, useRef, useEffect } from 'react';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

import { EnhancedTextarea } from './enhanced-textarea';
import { SendOptions } from './send-options';

interface MessageInputAreaProps {
  onSendTextMessage: (textMessage: string) => void;
  onSendEmojiMessage: (emoji: string) => void;
}

export const MessageInputArea = memo(
  ({ onSendTextMessage, onSendEmojiMessage }: MessageInputAreaProps) => {
    const [textMessage, setTextMessage] = useState('');
    const [showSendOptions, setShowSendOptions] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isTextMessageFieldDirty, setIsTextMessageFieldDirty] =
      useState(false);
    const messageField = useRef<HTMLTextAreaElement | null>(null);

    const { theme } = useTheme();

    useEffect(() => {
      setIsTextMessageFieldDirty(/\S/.test(textMessage));
    }, [textMessage]);

    const handleSendTextMessage = () => {
      onSendTextMessage(textMessage);
      setTextMessage('');
    };

    const handleEmojiInsert = (emoji: string) => {
      if (messageField.current && isTextMessageFieldDirty) {
        const field = messageField.current;

        const start = field.selectionStart;
        const end = field.selectionEnd;

        if (start === null || end === null) {
          return;
        }

        const value = field.value;

        field.value = value.substring(0, start) + emoji + value.substring(end);

        const newCursorPosition = start + emoji.length;
        field.selectionStart = field.selectionEnd = newCursorPosition;

        field.focus();

        const inputEvent = new Event('input', { bubbles: true });
        field.dispatchEvent(inputEvent);

        setTextMessage(field.value);
      } else {
        handleSendEmojiMessage(emoji);
      }
    };

    const handleSendEmojiMessage = (emoji: string) => {
      onSendEmojiMessage(emoji);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendTextMessage();
      }
    };

    return (
      <div className="relative">
        <div
          style={{
            display: showEmojiPicker ? 'block' : 'none',
          }}
          className="absolute bottom-[140px] left-3"
        >
          <Picker
            onEmojiSelect={(emoji: any) => {
              handleEmojiInsert(emoji.native);
            }}
            data={data}
            theme={theme}
            previewPosition="none"
          />
        </div>

        <div className="bg-accent px-2 pb-1 dark:bg-background sm:px-3 sm:pb-2">
          <div className="relative overflow-hidden rounded-lg border shadow-sm focus-within:border-yellow-500/60 focus-within:dark:border-primary/20">
            {/* Reply Dropdown */}

            <div className="bg-background dark:bg-muted/50">
              <EnhancedTextarea
                value={textMessage}
                ref={messageField}
                onChange={setTextMessage}
                onKeyDown={handleKeyDown}
                placeholder="Write a message..."
                className="site-scrollbar min-h-[40px] border-0 bg-transparent p-3 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                maxHeight={200}
              />
            </div>

            <div className="flex items-center justify-between bg-background p-2 dark:bg-muted/50">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="size-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Button
                    onClick={handleSendTextMessage}
                    disabled={!isTextMessageFieldDirty}
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
      </div>
    );
  }
);

MessageInputArea.displayName = 'MessageInputArea';
