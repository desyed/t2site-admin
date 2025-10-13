'use client';

import {
  ExternalLink,
  Gift,
  HelpCircle,
  LogOut,
  MessageCircle,
  Plus,
  User,
} from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router';

import { useAuthStore } from '@/app/auth/auth.store';
import { useProjectsQuery } from '@/app/project/project.hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/auth-provider';
import { cn } from '@/lib/utils';

import { Button } from '../site-button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';

const faqItems = [
  {
    title: 'What is Dub?',
    description:
      'How Dub works, what it can do for your business and what makes it different...',
  },
  {
    title: 'How to create a short link on Dub?',
    description:
      'Learn how to create your first short link on Dub and start tracking your links.',
  },
  {
    title: 'How to add a custom domain to Dub',
    description:
      'Learn how to add a custom domain your Dub workspace for free - no credit...',
  },
  {
    title: 'How to invite teammates on Dub',
    description:
      'Learn how to invite teammates to your Dub workspace and start collaborating...',
  },
  {
    title: 'Dub Analytics Overview',
    description:
      'Learn about how you can use Dub Analytics to better understand your...',
  },
  {
    title: 'Dub Conversions Overview',
    description:
      "Learn how you can use Dub's Conversion Analytics feature to understand h...",
  },
];

export function ProjectNavigationBar({ projectId }: { projectId: string }) {
  const { data: projectsResult } = useProjectsQuery();
  const projects = useMemo(() => projectsResult ?? [], [projectsResult]);

  const { user } = useAuthStore();

  const { logout } = useAuth();

  return (
    <div className="flex h-full w-16 flex-col items-center border-r border-gray-200 p-2">
      {/* Logo */}
      <div className="flex select-none items-center justify-center border-b border-gray-200 py-1">
        <div className="px-1 py-4 text-xl font-bold text-black">T2</div>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto">
        {projects?.map((project) => (
          <Link
            key={project.id}
            to={`/${project.id}`}
            className={`flex size-11 flex-col items-center justify-center rounded-lg p-1.5 text-xs font-medium text-icon transition-colors ${
              projectId === project.id
                ? `border-current bg-white`
                : 'hover:bg-gray-300'
            }`}
            title={project.name}
          >
            <div
              className={`flex size-7 flex-col items-center justify-center rounded-full bg-white p-2`}
            >
              <img
                src={project?.icon ?? '/project-icon-placeholder.png'}
                alt={project.name}
                className="size-full"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Add Project Button */}
      <div className="flex items-center justify-center p-2">
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0 text-icon hover:bg-gray-200"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3 border-t border-gray-200 py-3">
        <Button
          variant="ghost"
          size="sm"
          className="size-11 p-0 text-icon hover:bg-gray-200"
        >
          <Gift className="!size-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="size-11 p-0 text-icon hover:bg-gray-200"
            >
              <HelpCircle className="!size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="right"
            className="w-96 rounded-xl border bg-white p-4 shadow-lg"
          >
            <div className="mb-4">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                👋 How can we help?
              </h3>
              <Input
                placeholder="Search articles, guides, and more..."
                className="w-full"
              />
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer rounded-md p-2 hover:bg-gray-50"
                >
                  <h4 className="mb-1 text-sm font-medium text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <DropdownMenuSeparator className="my-3" />

            <div className="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <MessageCircle className="size-4" />
                Contact us
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                Help center
                <ExternalLink className="size-4" />
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex size-11 cursor-pointer flex-col items-center justify-center">
              <Avatar
                className={cn('size-8 rounded-full border border-gray-400')}
              >
                <AvatarImage src={user?.avatar ?? ''} alt={user?.name} />
                <AvatarFallback>{user?.name ?? ''}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="right"
            className="m-2 w-64 rounded-xl border bg-white shadow-lg"
          >
            <div className="mb-3 px-4 pt-2">
              <h4 className="font-semibold text-gray-900">{user?.name}</h4>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>

            <DropdownMenuItem className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100">
              <User className="size-4 text-gray-500" />
              Account settings
            </DropdownMenuItem>

            <DropdownMenuItem className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100">
              <Gift className="size-4 text-gray-500" />
              Refer and earn
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem
              onSelect={() => logout()}
              className="flex cursor-pointer items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-100"
            >
              <LogOut className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
