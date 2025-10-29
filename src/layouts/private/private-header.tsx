import {
  Bell,
  Menu,
  X,
  FolderKanban,
  Settings,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

import { useAuthStore } from '@/app/auth/auth.store';
import Brand from '@/components/Brand';
import { UserPreferencesSection } from '@/components/nav-user/user-preferences-section';
import { UserProfileSection } from '@/components/nav-user/user-profile-section';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, isActivePath } from '@/lib/utils';
const navigationItems = [
  {
    name: 'Projects',
    path: '/projects',
    icon: FolderKanban,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
  },

  {
    name: 'Docs',
    path: 'https://docs.t2site.com',
    icon: FileText,
    newTab: true,
  },
];

export default function PrivateHeader() {
  const { pathname } = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b bg-white/95 backdrop-blur-2xl dark:bg-black/70">
        <div className="flex h-14 items-center px-4 pr-5">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
            <Link
              to="/projects"
              className="flex items-center gap-2 font-semibold max-md:hidden"
            >
              <Brand className="h-[25px] w-[70px] sm:w-[80px]" />
            </Link>
            <nav className="hidden md:flex">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  target={item.newTab ? '_blank' : undefined}
                  className={cn(
                    'flex h-8 items-center rounded-md px-4',
                    'text-sm font-medium text-muted-foreground',
                    'gap-2 transition-colors hover:bg-accent hover:text-accent-foreground',
                    {
                      '!text-yellow-600 dark:!text-primary': isActivePath(
                        pathname,
                        item.path
                      ),
                    }
                  )}
                >
                  <item.icon className="size-4" />
                  {item.newTab ? (
                    <span className="relative flex items-center gap-1">
                      <span>{item.name}</span>
                      <ExternalLink className="size-3" />
                    </span>
                  ) : (
                    item.name
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-red-600" />
              </Button>
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative size-7 rounded-full"
                    aria-label="User menu"
                  >
                    <Avatar className="size-7">
                      <AvatarImage
                        src={user?.avatar ?? undefined}
                        alt={user?.name}
                      />
                      <AvatarFallback>{user?.name}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-sm" align="end">
                  <UserProfileSection />
                  <UserPreferencesSection privateHeader={true} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 transform transition-all duration-300 ease-in-out md:hidden',
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/50 transition-opacity',
            isDrawerOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Drawer content */}
        <div className="absolute inset-y-0 left-0 w-64 bg-background">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Brand className="h-[25px] w-[70px] sm:w-[80px]" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDrawerOpen(false)}
            >
              <X className="size-5" />
            </Button>
          </div>

          <nav className="flex flex-col p-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                target={item.newTab ? '_blank' : undefined}
                className={cn(
                  'flex h-10 items-center rounded-md px-4',
                  'text-sm font-medium text-muted-foreground',
                  'transition-colors hover:bg-accent hover:text-accent-foreground',
                  {
                    'text-accent-foreground': isActivePath(pathname, item.path),
                  }
                )}
                onClick={() => setIsDrawerOpen(false)}
              >
                <item.icon className="mr-3 size-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="h-16 w-full"></div>
    </>
  );
}
