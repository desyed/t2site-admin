'use client';

import type { LucideIcon } from 'lucide-react';

import {
  Activity,
  ChartLine,
  Cookie,
  Home,
  MessageCircle,
  Settings,
} from 'lucide-react';
import { useMemo } from 'react';
import * as React from 'react';
import { NavLink } from 'react-router';

import type { TServiceType } from '@/app/project/project.type';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import ProjectPopup from '@/components/projects/project-popup';
import { Button as SiteButton } from '@/components/site-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
} from '@/components/ui/sidebar';

export const navServices: {
  [key in TServiceType]: {
    title: string;
    url: string;
    icon: LucideIcon;
    id: TServiceType;
  };
} = {
  web_analytics: {
    title: 'Web analytics',
    url: '/web-analytics',
    icon: ChartLine,
    id: 'web_analytics',
  },
  chat_assistant: {
    title: 'Chat Assistant',
    url: '/chat-assistant',
    icon: MessageCircle,
    id: 'chat_assistant',
  },
  cookie_consent: {
    title: 'Cookie consent',
    url: '/cookie-consent',
    icon: Cookie,
    id: 'cookie_consent',
  },
};

const sidebarMenuItems = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
    },
    {
      title: 'Activity',
      url: '/activity',
      icon: Activity,
    },
    {
      title: 'Project Settings',
      url: '/settings/project',
      icon: Settings,
    },
  ],
  navServices: Object.values(navServices),
};

export type DashBoardSidebarProps = {
  children: React.ReactNode;
};
export default function DashBoardSidebar(props: DashBoardSidebarProps) {
  const finalNavSerice = useMemo(() => {
    // return sidebarMenuItems.navServices.filter((service) => {
    //   return service.id !== 'web_analytics';
    // });
    return [];
  }, []);
  return (
    <>
      <Sidebar collapsible="icon" variant="sidebar">
        <SidebarHeader>
          <ProjectPopup />
        </SidebarHeader>
        <Separator className="mb-2" />
        <SidebarContent>
          <NavMain items={sidebarMenuItems.navMain} />
          <Separator />
          {finalNavSerice.length > 0 ? (
            <NavMain items={finalNavSerice} />
          ) : (
            <div className="mt-2 flex flex-col gap-2 px-3">
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground/50">
                    No services enabled
                  </p>
                  <span className="text-xs text-muted-foreground/50">
                    Enable services to get started
                  </span>
                </div>
              </div>
              <div>
                <NavLink to="/settings/project">
                  <SiteButton variant="ghost" size="sm" icon={<Settings />}>
                    Configure Services
                  </SiteButton>
                </NavLink>
              </div>
            </div>
          )}
        </SidebarContent>
        <SidebarFooter className="py-0 pb-2">
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{props.children}</SidebarInset>
    </>
  );
}
