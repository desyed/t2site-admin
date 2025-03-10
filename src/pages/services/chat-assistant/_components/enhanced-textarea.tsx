'use client';

import type { ChangeEvent } from 'react';

import { useRef, useEffect } from 'react';

import type { TextareaProps } from '@/components/ui/textarea';

import { Textarea } from '@/components/ui/textarea';

interface EnhancedTextareaProps extends Omit<TextareaProps, 'onChange'> {
  onChange: (value: string) => void;
  maxHeight?: number; // Maximum height in pixels before scrolling
}

export function EnhancedTextarea({
  value,
  onChange,
  maxHeight = 120, // Default max height
  className,
  ...props
}: EnhancedTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Adjust height on input value change
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to properly calculate the new height
    textarea.style.height = 'auto';

    // Calculate the scroll height (the height of all content)
    const scrollHeight = textarea.scrollHeight;

    // Apply height, but cap it at maxHeight
    if (scrollHeight <= maxHeight) {
      textarea.style.height = `${scrollHeight}px`;
      textarea.style.overflowY = 'hidden';
    } else {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = 'auto';
    }
  }, [value, maxHeight]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      className={`transition-height resize-none ${className}`}
      {...props}
    />
  );
}
