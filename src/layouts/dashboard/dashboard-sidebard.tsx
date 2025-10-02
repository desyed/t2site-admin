'use client';

import type { LucideIcon } from 'lucide-react';

import {
  Activity,
  ChartLine,
  Cookie,
  Home,
  MessageCircle,
  RefreshCcw,
  Settings,
} from 'lucide-react';
import { useMemo } from 'react';
import * as React from 'react';
import { NavLink } from 'react-router';

import type { TServiceType } from '@/app/project/project.type';

import { useAuthStore } from '@/app/auth/auth.store';
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
import { Skeleton } from '@/components/ui/skeleton';

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
    url: '/services/web-analytics',
    icon: ChartLine,
    id: 'web_analytics',
  },
  chat_assistant: {
    title: 'Chat Assistant',
    url: '/services/chat-assistant',
    icon: MessageCircle,
    id: 'chat_assistant',
  },
  cookie_consent: {
    title: 'Cookie consent',
    url: '/services/cookie-consent',
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
  return (
    <>
      <SidebarInset>{props.children}</SidebarInset>
    </>
  );
}
