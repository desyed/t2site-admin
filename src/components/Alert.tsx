import type { MouseEvent } from 'react';

import { Icon } from '@iconify/react';

import { cn } from '@/lib/utils';

type AlertType = 'error' | 'info' | 'warning' | 'success';

interface AlertProps {
  type: AlertType;
  message: string;
  title?: string;
  close?: boolean;
  className?: string;
  handleClose?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

export default function Alert({
  type,
  message,
  title,
  close = false,
  className,
  handleClose,
}: AlertProps) {
  const alertStyles: Record<
    AlertType,
    { color: string; icon: string; border: string; bg: string }
  > = {
    error: {
      icon: 'mdi:error-outline',
      color: 'dark:text-red-600 text-red-500',
      border: 'dark:border-red-600 border-red-500',
      bg: 'dark:bg-red-700/15 bg-red-400/5',
    },
    info: {
      icon: 'mdi:information-outline',
      color: 'dark:text-blue-600 text-blue-500',
      border: 'dark:border-blue-600 border-blue-500',
      bg: 'dark:bg-blue-700/15 bg-blue-400/5',
    },
    warning: {
      icon: 'mdi:alert-outline',
      color: 'dark:text-yellow-600 text-yellow-500',
      border: 'dark:border-yellow-600 border-yellow-500',
      bg: 'dark:bg-yellow-700/15 bg-yellow-400/5',
    },
    success: {
      icon: 'mdi:check-circle-outline',
      color: 'dark:text-green-600 text-green-500',
      border: 'dark:border-green-600 border-green-500',
      bg: 'dark:bg-green-700/15 bg-green-400/5',
    },
  };

  const { color, icon, border, bg } = alertStyles[type];

  return (
    <div className={cn(`my-2 border p-3 rounded-md ${bg} ${color} ${border} relative`, className)}>
      {title && (
        <div className="flex items-center gap-2">
          <Icon className="size-6" icon={icon} />
          <h3 className="font-semibold">{title}</h3>
        </div>
      )}
      {title ? (
        <div className="ml-8 mt-1 text-sm font-semibold">{message}</div>
      ) : (
        <div className="mt-1 flex gap-2">
          <span>
            <Icon className="mt-[2px] size-6" icon={icon} />
          </span>
          <span className="text-sm font-semibold">{message}</span>
        </div>
      )}

      {close && (
        <button className={`absolute right-2 top-2 active:scale-90 ${color}`} onClick={handleClose}>
          <Icon icon="mdi:close" className="size-5" />
        </button>
      )}
    </div>
  );
}
