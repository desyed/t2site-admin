'use client';

import type React from 'react';

import {
  ArrowLeft,
  BarChart3,
  Calendar,
  ChevronRight,
  Lock,
  MessageCircle,
  MessageSquare,
  Puzzle,
  Settings,
  Shield,
  Sparkles,
  UserPlus,
  Users,
} from 'lucide-react'; // Import Settings icon
import { Link, useLocation, useNavigate } from 'react-router';

import type { NavigationGroup } from '@/types/dashboard';

import { useCurrentProjectQuery } from '@/app/project/project.hooks';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  projectId: string;
  onNavItemSelect?: () => void;
}

export function Sidebar({ projectId }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const router = useNavigate();

  const { data: currentProject } = useCurrentProjectQuery();

  const isProjectSettingsMode = pathname.includes('/project-settings');
  const isCookieConsentMode = pathname.includes('/cookie-consent');
  const isLiveDeskMode = pathname.includes('/live-desk');

  const handleBackToMain = () => {
    router(`/${projectId}/analytics`);
  };

  const handleProjectSettingsMode = (e: React.MouseEvent) => {
    e.preventDefault();
    router(`/${projectId}/project-settings`);
  };

  const handleLiveDeskMode = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to Live Chat (first option) by default
    router(`/${projectId}/live-desk/live-chat`);
  };

  const handleCookieConsentMode = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to Banner Settings (first option) by default
    router(`/${projectId}/cookie-consent`);
  };

  const projectSettingsCategories = [
    {
      name: 'General',
      href: `/${projectId}/project-settings`,
      icon: Shield,
      current: pathname === `/${projectId}/project-settings`,
    },
    {
      name: 'Team Members',
      href: `/${projectId}/project-settings/team-members`,
      icon: UserPlus,
      current: pathname === `/${projectId}/project-settings/team-members`,
    },
    {
      name: 'Integrations',
      href: `/${projectId}/project-settings/integrations`,
      icon: Puzzle,
      current: pathname === `/${projectId}/project-settings/integrations`,
    },
    {
      name: 'Security',
      href: `/${projectId}/project-settings/security`,
      icon: Lock,
      current: pathname === `/${projectId}/project-settings/security`,
    },
  ];

  const liveDeskCategories = [
    {
      name: 'Live Chat',
      href: `/${projectId}/live-desk/live-chat`,
      icon: MessageSquare,
      current: pathname.includes(`/${projectId}/live-desk/live-chat`),
    },
    {
      name: 'Facebook',
      href: `/${projectId}/live-desk/facebook`,
      icon: Shield,
      current: pathname.includes(`/${projectId}/live-desk/facebook`),
    },
    {
      name: 'Whatsapp',
      href: `/${projectId}/live-desk/whatsapp`,
      icon: MessageCircle,
      current: pathname.includes(`/${projectId}/live-desk/whatsapp`),
    },
    {
      name: 'Email',
      href: `/${projectId}/live-desk/email`,
      icon: Lock,
      current: pathname.includes(`/${projectId}/live-desk/email`),
    },
  ];

  const cookieConsentCategories = [
    {
      name: 'Banner Settings',
      href: `/${projectId}/cookie-consent?category=banner`,
      icon: Shield,
      current:
        pathname.includes(`/${projectId}/cookie-consent`) &&
        new URLSearchParams(window?.location?.search || '').get('category') ===
          'banner',
    },
    {
      name: 'Cookie Categories',
      href: `/${projectId}/cookie-consent?category=categories`,
      icon: Settings,
      current:
        pathname.includes(`/${projectId}/cookie-consent`) &&
        new URLSearchParams(window?.location?.search || '').get('category') ===
          'categories',
    },
    {
      name: 'Legal Compliance',
      href: `/${projectId}/cookie-consent?category=legal`,
      icon: Lock,
      current:
        pathname.includes(`/${projectId}/cookie-consent`) &&
        new URLSearchParams(window?.location?.search || '').get('category') ===
          'legal',
    },
  ];

  const navigationGroups: NavigationGroup[] = [
    {
      name: 'Insights',
      items: [
        {
          name: 'Analytics',
          href: `/${projectId}/analytics`,
          icon: BarChart3,
          current:
            pathname === `/${projectId}/analytics` ||
            pathname === `/${projectId}`,
        },
        {
          name: 'Events',
          href: `/${projectId}/events`,
          icon: Calendar,
          current: pathname === `/${projectId}/events`,
        },
        {
          name: 'Customers',
          href: `/${projectId}/customers`,
          icon: Users,
          current: pathname === `/${projectId}/customers`,
        },
      ],
    },
    {
      name: 'Services',
      items: [
        {
          name: 'Cookie Consent',
          href: `/${projectId}/cookie-consent`,
          icon: Shield,
          current: pathname.includes(`/${projectId}/cookie-consent`),
          onClick: handleCookieConsentMode, // Updated to use new handler
        },
        {
          name: 'Live Desk',
          href: `/${projectId}/live-desk`,
          icon: MessageSquare,
          current: pathname.includes(`/${projectId}/live-desk`),

          onClick: handleLiveDeskMode, // Updated to use new handler
        },
      ],
    },
    {
      name: 'Settings',
      items: [
        {
          name: 'Project Settings',
          href: `/${projectId}/project-settings`,
          icon: Shield,
          current: pathname === `/${projectId}/project-settings`,
          onClick: handleProjectSettingsMode, // Updated to use new handler
        },
        {
          name: 'Billing',
          href: `/${projectId}/billing`,
          icon: Puzzle,
          current: pathname === `/${projectId}/billing`,
        },
      ],
    },
  ];

  if (!currentProject) {
    return null;
  }

  return (
    <div className="relative flex h-full w-[232px] flex-col overflow-hidden rounded-xl border-r border-gray-200 bg-sidebar-primary">
      <div>
        <img
          src="https://res.cloudinary.com/dlqhvgxch/image/upload/v1761545961/bg_zrchck.png"
          alt="bg"
          className="absolute left-0 top-0 w-16 -scale-x-100 opacity-50"
        />
      </div>

      {/* Project Name */}
      <div className="p-4 pt-[22px]">
        <h2 className="text-right text-sm font-semibold text-gray-900">
          {currentProject.name}
        </h2>
      </div>

      <div
        className={cn(
          'flex-1 transition-all duration-300 ease-in-out',
          isProjectSettingsMode || isLiveDeskMode || isCookieConsentMode
            ? 'opacity-100'
            : 'opacity-100'
        )}
      >
        {isProjectSettingsMode ? (
          /* Project Settings Mode */
          <div className="p-3 pt-0">
            {/* Back Button */}
            <button
              onClick={handleBackToMain} // Updated to use handleBackToMain function
              className="mb-6 flex w-full items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-700 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="size-4" />
              Back to Settings
            </button>

            {/* Project Settings Categories */}
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Project Settings
              </h3>
              <ul className="space-y-0.5">
                {projectSettingsCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <li key={category.name}>
                      <Link
                        to={category.href}
                        className={cn(
                          'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                          category.current
                            ? 'bg-blue-100 font-medium text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        )}
                      >
                        <Icon className="size-4" />
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : isLiveDeskMode ? (
          /* Live Desk Chrome-like navigation mode */
          <div className="p-3 pt-0">
            {/* Back Button */}
            <button
              onClick={handleBackToMain} // Updated to use handleBackToMain function
              className="mb-6 flex w-full items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-700 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="size-4" />
              Back to Services
            </button>

            {/* Live Desk Categories */}
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Live Desk
              </h3>
              <ul className="space-y-0.5">
                {liveDeskCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <li key={category.name}>
                      <Link
                        to={category.href}
                        className={cn(
                          'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                          category.current
                            ? 'bg-blue-100 font-medium text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        )}
                      >
                        <Icon className="size-4" />
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : isCookieConsentMode ? (
          /* Cookie Consent Chrome-like navigation mode */
          <div className="p-3 pt-0">
            {/* Back Button */}
            <button
              onClick={handleBackToMain} // Updated to use handleBackToMain function
              className="mb-6 flex w-full items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-700 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="size-4" />
              Back to Services
            </button>

            {/* Cookie Consent Categories */}
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Cookie Consent
              </h3>
              <ul className="space-y-0.5">
                {cookieConsentCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <li key={category.name}>
                      <Link
                        to={category.href}
                        className={cn(
                          'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                          category.current
                            ? 'bg-blue-100 font-medium text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        )}
                      >
                        <Icon className="size-4" />
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          /* Normal Navigation Mode */
          <nav className="flex-1 space-y-6 p-3">
            {navigationGroups.map((group) => (
              <div key={group.name}>
                <h3 className="mb-3 px-3 text-xs tracking-wider text-neutral-500">
                  {group.name}
                </h3>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.name}>
                        {item.onClick ? (
                          <button
                            onClick={item.onClick}
                            className={cn(
                              'flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors',
                              item.current
                                ? 'bg-blue-100 font-medium text-blue-700'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            )}
                          >
                            <Icon className="size-4" />
                            {item.name}
                          </button>
                        ) : (
                          <Link
                            to={item.href}
                            className={cn(
                              'flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors',
                              item.current
                                ? 'bg-blue-100 font-medium text-blue-700'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            )}
                          >
                            <Icon className="size-4" />
                            {item.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        )}
      </div>

      {!(isProjectSettingsMode || isLiveDeskMode || isCookieConsentMode) && (
        <div className="border-t border-gray-200 p-3">
          <div className="mb-4">
            <Link
              to={`/${projectId}/billing`}
              className="mb-3 flex items-center p-0 text-xs font-medium tracking-wider text-gray-500"
            >
              Usage <ChevronRight strokeWidth={1} className="size-3" />
            </Link>
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b-2 py-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-gray-400" />
                  <span className="text-gray-700">Sessions</span>
                </div>
                <span className="text-gray-500">{123}</span>
              </div>
              <div className="flex items-center justify-between border-b-2 py-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-gray-400" />
                  <span className="text-gray-700">Members</span>
                </div>
                <span className="text-gray-500">{12345}</span>
              </div>
            </div>
            <p className="mt-2 pt-1 text-xs text-gray-400">
              Usage will reset Sep 26, 2025
            </p>
          </div>

          <Button
            size="sm"
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            Get T2 Pro
          </Button>
        </div>
      )}
    </div>
  );
}
