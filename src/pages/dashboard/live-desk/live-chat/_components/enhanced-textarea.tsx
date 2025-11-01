'use client';

import type { ChangeEvent } from 'react';

import { useRef, useEffect, forwardRef, useState } from 'react';

import type { TextareaProps } from '@/components/ui/textarea';

import { Textarea } from '@/components/ui/textarea';

interface EnhancedTextareaProps extends Omit<TextareaProps, 'onChange'> {
  value?: string;
  onChange: (value: string) => void;
  isTextMultiLine?: boolean;
  onHeightChange?: (isMultiLine: boolean) => void;
  maxHeight?: number; // Maximum height in pixels before scrolling
}

export const EnhancedTextarea = forwardRef<
  HTMLTextAreaElement,
  EnhancedTextareaProps
>(
  (
    {
      value,
      onChange,
      onHeightChange,
      isTextMultiLine,
      maxHeight = 120,
      className,
      ...props
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [baseHeight, setBaseHeight] = useState<number | null>(null);

    // Adjust height on input value change
    useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Reset height for proper scroll height measurement
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;

      // Record base height (for 1 line)
      if (baseHeight === null && value?.trim().length === 0) {
        setBaseHeight(scrollHeight);
      }

      // Apply height, but cap it at maxHeight
      if (scrollHeight <= maxHeight) {
        textarea.style.height = `${scrollHeight}px`;
        textarea.style.overflowY = 'hidden';
      } else {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = 'auto';
      }

      // Detect multiline if scrollHeight > baseHeight + small margin
      if (baseHeight !== null) {
        const isMultiLine = scrollHeight > baseHeight + 5; // small tolerance
        if (value?.trim().length === 0 || !isTextMultiLine) {
          onHeightChange?.(isMultiLine);
        }
      }
    }, [value, maxHeight, baseHeight, isTextMultiLine, onHeightChange]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };

    return (
      <Textarea
        ref={(el) => {
          textareaRef.current = el;
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        value={value}
        onChange={handleChange}
        className={`transition-height resize-none ${className}`}
        {...props}
      />
    );
  }
);

EnhancedTextarea.displayName = 'EnhancedTextarea';
