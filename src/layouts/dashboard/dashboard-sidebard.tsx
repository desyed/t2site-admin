'use client';

import {
  Activity,
  ChartLine,
  Cookie,
  CreditCard,
  Home,
  MessageCircle,
  Settings,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import ProjectPopup from '@/components/projects/project-popup';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
} from '@/components/ui/sidebar';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
    },
    {
      title: 'Activity',
      url: '/activity',
      icon: Activity,
    },
  ],
  navServices: [
    {
      title: 'Web analytics',
      url: '/web-analytics',
      icon: ChartLine,
    },
    {
      title: 'Chat Assistant',
      url: '/chat-assistant',
      icon: MessageCircle,
    },
    {
      title: 'Cookie consent',
      url: '/cookie-consent',
      icon: Cookie,
    },
  ],
  navSecondary: [
    {
      title: 'Billing',
      url: '/billing',
      icon: CreditCard,
    },
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
          <ProjectPopup />
        </SidebarHeader>
        <Separator className="mb-2" />
        <SidebarContent>
          <NavMain items={data.navMain} />
          <Separator />
          <NavMain items={data.navServices} />
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
