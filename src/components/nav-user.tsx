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
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import type { TOrganization } from '@/app/auth/auth-store';

import { useAuthStore } from '@/app/auth/auth-store';
import { changeCurrentOrganizationApi } from '@/app/organization/organization-api';
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
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/auth-provider';
import { useApi } from '@/hooks/use-api';
import { cn } from '@/lib/utils';

import type { Theme } from './theme-provider';

import { CreateOrganizationDialog } from './organization/create-organization-dialog';
import { useTheme } from './theme-provider';
import MemberRoleBadge from "./organization/member-role-badge";
import { useState } from "react";
import InviteMemberDialog from "./organization/invite-member-dialog";

export function NavUser() {

  const [inviteMemberDialogOpen, setInviteMemberDialogOpen] = useState(false);

  const authUser = useAuthStore((state) => state.user);

  const userOrganizations = useAuthStore((state) => state.userOrganization);

  const { toggleSidebar, isMobile } = useSidebar();

  const { theme, setTheme } = useTheme();
  const handleThemeSelect = (theme: Theme) => {
    setTheme(theme);
  };

  const navigate = useNavigate();

  const { logout } = useAuth();

  const { executeMutation } = useApi<{
    currentOrganizationId: string;
    access_token: string;
  }>(changeCurrentOrganizationApi);

  const handleChangeOrganization = async (organization: TOrganization) => {
    toast.promise(executeMutation({ organizationId: organization.id }), {
      loading: 'Changing organization...',
      success: (result) => {
        if (result.data?.currentOrganizationId) {
          navigate(`/auth?ocr=true&rp=${window.location.pathname}`);
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
          <DropdownMenu onOpenChange={(open) => {
            if (!open && isMobile) {
              toggleSidebar();
            }
          }}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="rounded-lg data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="size-8 rounded-full">
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
              className="rounded-md md:min-w-80"
              side={isMobile ? 'top' : 'left'}
              align="end"
              sideOffset={4}
            >
              <div>
                <DropdownMenuLabel className="uppercase">
                  Signed in as
                </DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => navigate('/settings/user/profile')} className="p-0 font-normal">
                  <div className="flex flex-1 items-center gap-2 px-1 py-1.5 text-left  text-sm">
                    <Avatar className="size-9 rounded-full">
                      <AvatarImage
                        src={authUser?.avatar ?? ''}
                        alt={authUser?.name}
                      />
                      <AvatarFallback className="rounded-full">
                        {authUser?.name ?? ''}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="text-md truncate font-semibold">
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
                {userOrganizations?.currentOrganization && (
                  <>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="uppercase">
                        Current Organization
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onSelect={() => navigate('/settings/organization')}
                      >
                        <Avatar className="size-7 rounded-full">
                          <AvatarImage
                            src={
                              userOrganizations?.currentOrganization?.logo ?? ''
                            }
                            alt={
                              userOrganizations?.currentOrganization?.name ?? ''
                            }
                          />
                          <AvatarFallback className="rounded-lg">
                            {userOrganizations?.currentOrganization?.name ?? ''}
                          </AvatarFallback>
                        </Avatar>
                        <span className="line-clamp-2">
                          {userOrganizations?.currentOrganization?.name}
                        </span>
                        <MemberRoleBadge
                          role={
                            userOrganizations?.currentOrganization?.role ??
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
                      <DropdownMenuItem onSelect={() => setInviteMemberDialogOpen(true)}>
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
                  <div className="site-scrollbar max-h-[calc(100vh-55vh)] overflow-x-hidden">
                    {userOrganizations?.organizations.map(
                      (organization) =>
                        organization.id !==
                        userOrganizations?.currentOrganization?.id && (
                          <DropdownMenuItem
                            onSelect={() =>
                              handleChangeOrganization(organization)
                            }
                            key={organization.id}
                          >
                            <Avatar className="size-7 rounded-full">
                              <AvatarImage
                                src={organization.logo ?? ''}
                                alt={organization.name ?? ''}
                              />
                              <AvatarFallback className="rounded-lg">
                                {organization.name ?? ''}
                              </AvatarFallback>
                            </Avatar>
                            <span>{organization.name}</span>
                            <MemberRoleBadge role={organization.role} />
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
                  {`What's`} new
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
                  className="h-8 w-full justify-start text-sm text-destructive/80 hover:bg-destructive/20 hover:text-destructive focus:bg-destructive/20 focus:text-destructive/80"
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <InviteMemberDialog
        openFromParent={inviteMemberDialogOpen}
        setOpenFromParent={setInviteMemberDialogOpen}
      />
    </>
  );
}
