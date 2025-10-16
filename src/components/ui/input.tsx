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
          'flex h-10 w-full rounded-md border border-input !bg-white px-3 py-2 text-sm dark:!bg-black',
          'transition-shadow duration-200',
          'placeholder:text-muted-foreground',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none',
          'focus-visible:shadow-[0_0_0_1px_rgb(0_0_0_/_46%),_0_0_1px_3px_rgb(0_0_0_/_24%)]',
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
