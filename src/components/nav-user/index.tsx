import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { useAuthStore } from '@/app/auth/auth.store';
import { CreateOrganizationDialog } from '@/components/organization/create-organization-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

import { CurrentOrganizationSection } from './current-organization-section';
import { OtherOrganizationsSection } from './other-organizations-section';
import { UserPreferencesSection } from './user-preferences-section';
import { UserProfileSection } from './user-profile-section';

export function NavUser() {
  const [createOrganizationDialogOpen, setCreateOrganizationDialogOpen] =
    useState(false);

  const authUser = useAuthStore((state) => state.user);
  const userOrganizations = useAuthStore((state) => state.userOrganization);
  const { isMobile } = useSidebar();

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
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
                <ChevronsUpDown className="ml-auto size-4 opacity-70" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="rounded-md md:min-w-72"
              side={isMobile ? 'top' : 'left'}
              align="end"
              sideOffset={4}
            >
              <div className="site-scrollbar max-h-screen overflow-x-hidden">
                <UserProfileSection />

                {userOrganizations?.currentOrganization && (
                  <CurrentOrganizationSection />
                )}

                <OtherOrganizationsSection
                  setCreateOrganizationDialogOpen={
                    setCreateOrganizationDialogOpen
                  }
                />

                <UserPreferencesSection />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <CreateOrganizationDialog
        openFromParent={createOrganizationDialogOpen}
        setOpenFromParent={setCreateOrganizationDialogOpen}
      />
    </>
  );
}
