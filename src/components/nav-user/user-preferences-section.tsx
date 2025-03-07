import {
  Bell,
  LogOut,
  MoonIcon,
  SunIcon,
  Laptop2,
  PartyPopper,
  Sparkles,
} from 'lucide-react';

import type { Theme } from '@/components/theme-provider';

import { useTheme } from '@/components/theme-provider';
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/auth-provider';
import { cn } from '@/lib/utils';

export function UserPreferencesSection({
  privateHeader = false,
}: {
  privateHeader?: boolean;
}) {
  const { logout } = useAuth();

  const { theme, setTheme } = useTheme();

  const handleThemeSelect = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <>
      {!privateHeader && (
        <DropdownMenuItem className="flex items-center gap-3 py-2">
          <Bell className="size-4" />
          <span>Notifications</span>
        </DropdownMenuItem>
      )}
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center gap-3 py-2 font-semibold">
          <span className="translate-x-[3px]">
            {theme === 'light' && <SunIcon className="size-4" />}
            {theme === 'dark' && <MoonIcon className="size-4" />}
            {theme === 'system' && <Laptop2 className="size-4" />}
          </span>
          <span className="flex-1 translate-x-[7.5px]">Color theme</span>
          <span className="text-xs capitalize text-muted-foreground">
            {theme} mode
          </span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            onSelect={() => handleThemeSelect('light')}
            className={cn('flex items-center gap-3 ', {
              'bg-muted': theme === 'light',
            })}
          >
            <SunIcon className="size-4" /> <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => handleThemeSelect('dark')}
            className={cn('flex items-center gap-3 ', {
              'bg-muted': theme === 'dark',
            })}
          >
            <MoonIcon className="size-4" /> <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => handleThemeSelect('system')}
            className={cn('flex items-center gap-3 ', {
              'bg-muted': theme === 'system',
            })}
          >
            <Laptop2 className="size-4" /> <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuItem className="flex items-center gap-3 py-2">
        <PartyPopper className="size-4" />
        <span>{`What's`} new</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="flex items-center gap-3 py-2">
        <Sparkles className="size-4" />
        <span>Feature preview</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => logout()}
        className="flex w-full items-center justify-start gap-3 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
      >
        <LogOut className="size-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </>
  );
}
