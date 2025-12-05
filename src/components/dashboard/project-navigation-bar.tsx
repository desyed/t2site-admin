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
import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import { useAuthStore } from '@/app/auth/auth.store';
import { useProjectsQuery } from '@/app/project/project.hooks';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/auth-provider';
import { cn } from '@/lib/utils';

import { CreateProjectForm } from '../projects/create-project-form';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { DialogHeader } from '../ui/dialog';
import { Input } from '../ui/input';

const faqItems = [
  {
    title: 'What is T2site?',
    description:
      'T2site unifies WhatsApp, Messenger, Instagram, and Email — helping teams manage all customer chats from one simple dashboard.',
  },
  {
    title: 'Who is T2site for?',
    description:
      'Perfect for businesses, agencies, and marketing teams that handle multiple brand accounts and want to simplify communication.',
  },
  {
    title: 'Which platforms can I connect?',
    description:
      'Connect WhatsApp Business, Facebook Messenger, Instagram DM, and Email (Gmail, Outlook, or custom). More coming soon!',
  },
  {
    title: 'Can I reply directly from T2site?',
    description:
      'Yes! Send, receive, and manage all messages, attachments, and threads without switching apps.',
  },
  {
    title: 'Is my data secure?',
    description:
      'Absolutely. T2site uses official APIs and encrypted channels to keep your data safe and compliant.',
  },
  {
    title: 'Can my team collaborate?',
    description:
      'Yes. Invite teammates, assign chats, and manage roles to keep your communication organized.',
  },
  {
    title: 'Do I get instant notifications?',
    description:
      'T2site alerts you instantly for new messages or mentions across all connected channels.',
  },
  {
    title: 'Can I search messages easily?',
    description:
      'Use the smart search to find any message, contact, or keyword across all platforms — instantly.',
  },
  {
    title: 'Does it include analytics?',
    description:
      'Yes! Track message volume, response times, and team performance with real-time insights.',
  },
  {
    title: 'What makes T2site unique?',
    description:
      'Unlike typical social tools, T2site focuses on real conversations — not just posts. It’s your all-in-one chat hub.',
  },
];

export function ProjectNavigationBar({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);

  const { data: projectsResult } = useProjectsQuery();
  const projects = useMemo(() => projectsResult ?? [], [projectsResult]);

  const { user } = useAuthStore();

  const { logout } = useAuth();

  return (
    <div className="flex h-full w-16 flex-col items-center border-r border-gray-200 p-2">
      {/* Logo */}
      <div className="flex select-none items-center justify-center border-b border-gray-200 py-1">
        <div className="px-1 py-4 text-xl font-bold text-[#bdbaba]">T2</div>
      </div>

      <div className="no-scrollbar mb-2 flex max-h-96 flex-col gap-3 overflow-y-auto">
        {projects?.map((project) => (
          <Link
            key={project.id}
            to={`/${project.id}`}
            className={`flex size-11 flex-col items-center justify-center rounded-full p-1.5 text-xs font-medium text-icon transition-colors ${
              projectId === project.id ? `bg-[#dcdcdc]` : 'hover:bg-gray-300'
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

      {/* Add Project Button with Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="size-8 rounded-full p-0 text-icon hover:bg-gray-200"
            onClick={() => setOpen(true)}
          >
            <Plus className="size-4" />
          </Button>
        </DialogTrigger>

        <DialogContent className="p-8 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>
          <CreateProjectForm
            onSuccess={() => {
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3 border-t border-gray-200 py-2">
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
            className="w-80 rounded-xl border bg-white p-4 shadow-lg sm:w-96"
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
              <Avatar className={cn('size-7 rounded-full')}>
                <AvatarImage src={user?.avatar ?? ''} alt={user?.name} />
                <AvatarFallback className="bg-black text-xs text-white">
                  {user?.name ?? ''}
                </AvatarFallback>
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

            <Link to="/account-settings">
              <DropdownMenuItem className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100">
                <User className="size-4 text-gray-500" />
                Account settings
              </DropdownMenuItem>
            </Link>

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
