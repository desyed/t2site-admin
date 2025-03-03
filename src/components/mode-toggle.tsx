import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/site-button';
import { useTheme } from '@/components/theme-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative size-9 border-muted-foreground/20"
        >
          {theme === 'light' ? <Sun /> : <Moon />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="flex items-center gap-2 px-3 py-2"
          data-state={theme === 'light' ? 'active' : ''}
        >
          <Sun className="size-4" />
          <span>Light</span>
          {theme === 'light' && (
            <span className="absolute right-2 flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
            </span>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="flex items-center gap-2 px-3 py-2"
          data-state={theme === 'dark' ? 'active' : ''}
        >
          <Moon className="size-4" />
          <span>Dark</span>
          {theme === 'dark' && (
            <span className="absolute right-2 flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
            </span>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="flex items-center gap-2 px-3 py-2"
          data-state={theme === 'system' ? 'active' : ''}
        >
          <Sun className="size-4" />
          <span>System</span>
          {theme === 'system' && (
            <span className="absolute right-2 flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
            </span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
