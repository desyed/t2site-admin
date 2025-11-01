import * as React from 'react';

import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        rows={1}
        className={cn(
          'flex w-full rounded-md border border-input !bg-white px-3 py-2 text-sm dark:!bg-black',
          'transition-shadow duration-200',
          'placeholder:text-muted-foreground',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none',
          'dark:focus-visible:shadow-[0_0_0_1px_rgba(234,179,8,0.3),0_0_2px_4px_rgba(234,179,8,0.15)]',
          'focus-visible:shadow-[0_0_0_1px_rgb(255_206_52_/_46%),_0_0_1px_3px_rgb(234_179_8_/_24%)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
