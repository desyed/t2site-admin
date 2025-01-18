'use client';

import {
  Home,
  Settings,
  Tickets,
} from 'lucide-react';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
} from '@/components/ui/sidebar';

import { NavUser } from '@/components/nav-user';
import { NavMain } from "@/components/nav-main";
import NavLogo from "@/components/nav-logo";

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Tickets',
      url: '/tickets',
      icon: Tickets,
    },
    
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
  ],
};

export type DashBoardSidebarProps = {
  children: React.ReactNode;
};
export default function DashBoardSidebar(props: DashBoardSidebarProps) {
  return (
    <>
      <Sidebar collapsible="icon" variant="sidebar">
        <SidebarHeader>
          <NavLogo />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
				<NavMain items={data.navSecondary} />
        <SidebarFooter className="py-0 pb-2">
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{props.children}</SidebarInset>
    </>
  );
}
