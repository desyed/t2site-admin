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
import { TOrganization, useAuthStore } from '@/app/auth/authStore';
import { Theme, useTheme } from './theme-provider';
import { useAuth } from '@/contexts/AuthProvider';
import { cn } from '@/lib/utils';
import { CreateOrganizationDialog } from './dialogs/create-organization-dialog';
import { RoleBadge } from './role-badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { useApi } from '@/hooks/use-api';
import { changeCurrentOrganizationMutation } from '@/app/organization/organizationApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export function NavUser() {
  const authUser = useAuthStore((state) => state.user);
  const authOrganization = useAuthStore((state) => state.userOrganization);
  const isMobile = useIsMobile();

  const { theme, setTheme } = useTheme();
  const handleThemeSelect = (theme: Theme) => {
    setTheme(theme);
  };

  const navigate = useNavigate();

  const { logout } = useAuth();

  const { executeMutation } = useApi<{
    currentOrganizationId: string;
    access_token: string;
  }>(changeCurrentOrganizationMutation);

  const handleChangeOrganization = async (organization: TOrganization) => {
    toast.promise(executeMutation({ organizationId: organization.id }), {
      loading: 'Changing organization...',
      success: (result) => {
        if (result.data?.currentOrganizationId) {
          navigate('/auth?ocr=true');
          return `Now organization switched to ${organization.name}`;
        } else {
          return `Failed to change organization!`;
        }
      },
      error: 'Failed to change organization!',
      position: 'top-center',
      duration: 1000,
    });
  };

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

                  <AvatarFallback className="rounded-full">
                    {authUser?.name ?? ''}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {authUser?.name}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="md:min-w-80 rounded-md"
              side={isMobile ? 'top' : 'left'}
              align="end"
              sideOffset={4}
            >
              <div>
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
                      <AvatarFallback className="rounded-full">
                        {authUser?.name ?? ''}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-md">
                        {authUser?.name}
                      </span>
                      <span className="truncate text-xs">
                        {authUser?.email}
                      </span>
                    </div>
                    <DropdownMenuShortcut>
                      <Settings />
                    </DropdownMenuShortcut>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {authOrganization?.currentOrganization && (
                  <>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="uppercase">
                        Current Organization
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onSelect={() => navigate('/settings/organization')}
                      >
                        <Avatar className="h-7 w-7 rounded-lg">
                          <AvatarImage
                            src={
                              authOrganization?.currentOrganization?.logo ?? ''
                            }
                            alt={
                              authOrganization?.currentOrganization?.name ?? ''
                            }
                          />
                          <AvatarFallback className="rounded-lg">
                            {authOrganization?.currentOrganization?.name ?? ''}
                          </AvatarFallback>
                        </Avatar>
                        <span className="line-clamp-2">
                          {authOrganization?.currentOrganization?.name}
                        </span>
                        <RoleBadge
                          role={
                            authOrganization?.currentOrganization?.role ??
                            'none'
                          }
                        />
                        <DropdownMenuShortcut>
                          <Settings />
                        </DropdownMenuShortcut>
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
                  </>
                )}

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="uppercase">
                    Other Organizations
                  </DropdownMenuLabel>
                  <div className="max-h-[calc(100vh-55vh)] overflow-x-hidden site-scrollbar">
                    {authOrganization?.organizations.map(
                      (organization) =>
                        organization.id !==
                          authOrganization?.currentOrganization?.id && (
                          <DropdownMenuItem
                            onSelect={() =>
                              handleChangeOrganization(organization)
                            }
                            key={organization.id}
                          >
                            <Avatar className="h-7 w-7 rounded-lg">
                              <AvatarImage
                                src={organization.logo ?? ''}
                                alt={organization.name ?? ''}
                              />
                              <AvatarFallback className="rounded-lg">
                                {organization.name ?? ''}
                              </AvatarFallback>
                            </Avatar>
                            <span>{organization.name}</span>
                            <RoleBadge role={organization.role} />
                          </DropdownMenuItem>
                        )
                    )}
                  </div>

                  <DropdownMenuItem asChild>
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
                  className="w-full justify-start text-sm h-8 hover:bg-destructive/20 hover:text-destructive text-destructive/80 focus:text-destructive/80 focus:bg-destructive/20"
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
