import * as React from 'react';

import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm',
          'transition-shadow duration-200',
          'placeholder:text-muted-foreground',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none ',
          'dark:focus-visible:shadow-[0_0_0_1px_rgba(234,179,8,0.3),0_0_2px_4px_rgba(234,179,8,0.15)]',
          'focus-visible:shadow-[0_0_0_1px_rgba(234,179,8,0.3),0_0_2px_4px_rgb(255_151_0_/25%)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
