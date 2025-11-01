'use client';

import type React from 'react';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Smile, SendIcon, Plus, FileIcon, Camera, Phone } from 'lucide-react';
import { memo, useState, useRef, useEffect } from 'react';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useMediaQuery } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

import { EnhancedTextarea } from './enhanced-textarea';
import { SendOptions } from './send-options';

interface MessageInputAreaProps {
  onSendTextMessage: (textMessage: string) => void;
  onSendEmojiMessage: (emoji: string) => void;
}

export const MessageInputArea = memo(
  ({ onSendTextMessage, onSendEmojiMessage }: MessageInputAreaProps) => {
    const [textMessage, setTextMessage] = useState('');
    const [isTextMultiLine, setIsTextMultiLine] = useState(false);
    const [showSendOptions, setShowSendOptions] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isTextMessageFieldDirty, setIsTextMessageFieldDirty] =
      useState(false);
    const messageField = useRef<HTMLTextAreaElement | null>(null);

    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const { theme } = useTheme();

    useEffect(() => {
      setIsTextMessageFieldDirty(/\S/.test(textMessage));
    }, [textMessage]);

    const handleSendTextMessage = () => {
      onSendTextMessage(textMessage);
      setTextMessage('');
      if (!isDesktop) {
        setShowEmojiPicker(false);
      }
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

        setTextMessage(field.value.trim());
      } else {
        if (!isDesktop) {
          setShowEmojiPicker(false);
        }
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
        <div className="px-2 pb-1 sm:px-3 sm:pb-2">
          <div className="relative">
            {/* Reply Dropdown */}

            <div className="relative">
              <div
                style={{
                  display: showEmojiPicker ? 'block' : 'none',
                }}
                className="absolute -top-2 right-0 -translate-y-full"
              >
                <Picker
                  onEmojiSelect={(emoji: any) => {
                    handleEmojiInsert(emoji.native);
                    setShowEmojiPicker(false);
                  }}
                  data={data}
                  theme={theme}
                  previewPosition="none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 overflow-hidden rounded-[28px] border bg-background py-1">
                <div
                  className={cn(
                    'pl-2',
                    isTextMultiLine ? 'order-2 w-fit flex-1' : 'order-1 w-fit'
                  )}
                >
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          'size-8 rounded-full text-muted-foreground hover:text-foreground',
                          showEmojiPicker && '!bg-accent !text-primary'
                        )}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-fit p-2" align="start">
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="py-2 pr-6">
                          <FileIcon className="mr-2 size-4" /> Files
                        </DropdownMenuItem>
                        <DropdownMenuItem className="py-2 pr-6">
                          <Camera className="mr-2 size-4" /> Photos & Videos
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <EnhancedTextarea
                  value={textMessage}
                  ref={messageField}
                  onChange={setTextMessage}
                  isTextMultiLine={isTextMultiLine}
                  onHeightChange={setIsTextMultiLine}
                  onKeyDown={handleKeyDown}
                  placeholder="Write a message..."
                  className={cn(
                    'site-scrollbar order-2 border-none bg-transparent py-3 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                    isTextMultiLine
                      ? 'order-1 w-full flex-grow'
                      : 'order-2 flex-1'
                  )}
                />

                <div className="order-3 flex items-center gap-2 px-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'size-8 rounded-full text-muted-foreground hover:text-foreground',
                      showEmojiPicker && '!bg-accent !text-primary'
                    )}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile className="size-4" />
                  </Button>

                  <div className="relative">
                    <Button
                      onClick={handleSendTextMessage}
                      disabled={!isTextMessageFieldDirty}
                      size="icon"
                      className="size-8 gap-2 rounded-full transition-colors"
                    >
                      <SendIcon className="size-4" />
                    </Button>
                    {showSendOptions && (
                      <div className="absolute bottom-full right-0 z-50 mb-2">
                        <SendOptions
                          onClose={() => setShowSendOptions(false)}
                        />
                      </div>
                    )}
                  </div>
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
