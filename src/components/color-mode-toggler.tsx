import { MoonIcon, SunIcon, Laptop2 } from 'lucide-react';

import type { Theme } from '@/components/theme-provider';

import { useTheme } from '@/components/theme-provider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function ColorModeToggler() {
  const { theme, setTheme } = useTheme();

  const handleThemeSelect = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <div className="flex h-8 items-center gap-2 rounded-md border bg-muted px-1">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={cn('rounded-sm p-1 transition-colors', {
                'bg-background shadow-sm': theme === 'light',
              })}
              onClick={(e) => {
                e.preventDefault();
                handleThemeSelect('light');
              }}
            >
              <SunIcon className="size-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            sideOffset={5}
            className="text-xs font-medium"
          >
            Light mode
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={cn('rounded-sm p-1 transition-colors', {
                'bg-background shadow-sm': theme === 'dark',
              })}
              onClick={(e) => {
                e.preventDefault();
                handleThemeSelect('dark');
              }}
            >
              <MoonIcon className="size-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            sideOffset={5}
            className="text-xs font-medium"
          >
            Dark mode
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={cn('rounded-sm p-1 transition-colors', {
                'bg-background shadow-sm': theme === 'system',
              })}
              onClick={(e) => {
                e.preventDefault();
                handleThemeSelect('system');
              }}
            >
              <Laptop2 className="size-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            sideOffset={5}
            className="text-xs font-medium"
          >
            System mode
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
