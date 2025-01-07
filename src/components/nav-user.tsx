import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  MoonIcon,
  Sparkles,
  SunIcon,
  Laptop2,
  PartyPopper,
  Plus,
  Settings,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/app/auth/authStore';
import { Theme, useTheme } from './theme-provider';
import { useAuth } from '@/contexts/AuthProvider';
import { cn, getNameInitials } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CreateOrganizationDialog } from "./dialogs/create-organization-dialog";

export function NavUser() {
  const authUser = useAuthStore((state) => state.user);

  const { theme, setTheme } = useTheme();
  const handleThemeSelect = (theme: Theme) => {
    setTheme(theme);
  };

  const { logout } = useAuth();

  return (
   <>
	  <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-lg"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src={authUser?.avatar ?? ''}
                  alt={authUser?.name}
                />
                {authUser && (
                  <AvatarFallback className="rounded-full">
                    {getNameInitials(authUser.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{authUser?.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-md"
            side="left"
            align="end"
            sideOffset={4}
          >
            <div className="max-h-[calc(100vh-25px)] overflow-x-hidden site-scrollbar ">
              <DropdownMenuLabel className="uppercase">
                Signed in as
              </DropdownMenuLabel>
              <DropdownMenuItem className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm  flex-1">
                  <Avatar className="h-9 w-9 rounded-full">
                    <AvatarImage
                      src={authUser?.avatar ?? ''}
                      alt={authUser?.name}
                    />
                    {authUser && (
                      <AvatarFallback className="rounded-full">
                        {getNameInitials(authUser.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-md">
                      {authUser?.name}
                    </span>
                    <span className="truncate text-xs">{authUser?.email}</span>
                  </div>
                  <span className="mr-1">
                    <Settings />
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="uppercase">
                  Current Organization
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <Avatar className="h-7 w-7 rounded-lg">
                    <AvatarImage src={''} alt={''} />
                    {authUser && (
                      <AvatarFallback className="rounded-lg">
                        {getNameInitials('T2 Site')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>T2 Site</span>
                  <Badge variant="warning">OWNER</Badge>
                  <span className="ml-auto mr-1">
                    <Settings />
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus />
                  <span>Invite members</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="uppercase">
                  Other Organizations
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <Avatar className="h-7 w-7 rounded-lg">
                    <AvatarImage src={''} alt={''} />
                    {authUser && (
                      <AvatarFallback className="rounded-lg">
                        {getNameInitials('T2 Site')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>T2 Site</span>
                  <Badge variant="warning">OWNER</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Avatar className="h-7 w-7 rounded-lg">
                    <AvatarImage src={''} alt={''} />
                    {authUser && (
                      <AvatarFallback className="rounded-lg">
                        {getNameInitials('Uqidev')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>UQI DEV</span>
                  <Badge variant="secondary">MEMBER</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Avatar className="h-7 w-7 rounded-lg">
                    <AvatarImage src={''} alt={''} />
                    {authUser && (
                      <AvatarFallback className="rounded-lg">
                        {getNameInitials('OMS')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>OMG</span>
                  <Badge variant="success">ADMIN</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem asChild >
									<CreateOrganizationDialog />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="font-semibold">
                  {theme === 'light' && <SunIcon />}
                  {theme === 'dark' && <MoonIcon />}
                  {theme === 'system' && <Laptop2 />}
                  <span className="ml-3">Color theme</span>
                  <DropdownMenuShortcut className="font-sans capitalize tracking-tighter">
                    {theme} mode
                  </DropdownMenuShortcut>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onSelect={() => {
                      handleThemeSelect('light');
                    }}
                    className={cn({
                      'bg-muted': theme === 'light',
                    })}
                  >
                    <SunIcon /> Light
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      handleThemeSelect('dark');
                    }}
                    className={cn({
                      'bg-muted': theme === 'dark',
                    })}
                  >
                    <MoonIcon /> Dark
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onSelect={() => {
                      handleThemeSelect('system');
                    }}
                    className={cn({
                      'bg-muted': theme === 'system',
                    })}
                  >
                    <Laptop2 /> System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <PartyPopper size={16} />
                What's new
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Sparkles />
                Feature preview
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  logout();
                }}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      
    </>
  );
}
