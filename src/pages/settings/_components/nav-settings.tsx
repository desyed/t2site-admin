import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SidebarMenu, SidebarMenuButton } from '@/components/ui/sidebar';
import { SidebarGroup } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { isActivePath } from '@/lib/utils';

const projectMenu = [
  {
    label: 'General',
    path: '/settings/project',
  },
  {
    label: 'Product analytics',
    path: '/settings/project/analytics',
  },
  {
    label: 'Integrations',
    path: '/settings/project/integrations',
  },
  {
    label: 'Access control',
    path: '/settings/project/access-control',
  },
  {
    label: 'Danger zone',
    path: '/settings/project/danger-zone',
  },
];

const organizationMenu = [
  {
    label: 'General',
    path: '/settings/organization',
  },
  {
    label: 'Members',
    path: '/settings/organization/members',
  },
  {
    label: 'Roles',
    path: '/settings/organization/roles',
  },
  {
    label: 'Danger zone',
    path: '/settings/organization/danger-zone',
  },
];

const userMenu = [
  {
    label: 'Profile',
    path: '/settings/user',
  },
  {
    label: 'Account',
    path: '/settings/user/account',
  },
  {
    label: 'Customization',
    path: '/settings/user/customization',
  },
];

const settingsMenu = {
  project: projectMenu,
  organization: organizationMenu,
  user: userMenu,
};

export default function NavSettings() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const { pathname } = useLocation();

  const activeMenuLabel = useMemo(() => {
    const activeSettings = pathname.split('/').slice(2);
    if (activeSettings.length === 1) {
      return activeSettings[0] + ' / General';
    } else {
      return activeSettings.join(' / ').replace(/[_-]/g, ' ');
    }
  }, [pathname]);

  useEffect(() => {
    if (!isMobile) {
      setOpen(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [pathname, navigate, isMobile]);

  return (
    <div className="mx-4 flex flex-col items-start max-sm:mt-4 sm:mt-5 sm:gap-5 md:flex-row lg:mx-6 lg:mt-8 lg:gap-10">
      <div className="top-20 bg-background max-md:mb-6 max-md:w-full max-md:border-b max-md:pb-2 md:sticky md:min-w-[12.4rem]">
        <Collapsible open={open} onOpenChange={setOpen}>
          <div className="hidden max-md:block ">
            <Button
              variant="ghost"
              size="default"
              className="flex-start h-2 w-full justify-start px-2 text-start capitalize hover:bg-transparent"
              onClick={() => setOpen(!open)}
              icon={
                <>
                  {open ? (
                    <ChevronDownIcon className="mt-[4px] size-4" />
                  ) : (
                    <ChevronRightIcon className="mt-[2px] size-4" />
                  )}
                </>
              }
              iconPosition="right"
            >
              {activeMenuLabel}
            </Button>
          </div>

          <CollapsibleContent>
            <SidebarGroup>
              <span className="mb-1 mt-4 select-none text-sm font-semibold text-muted-foreground">
                Project
              </span>
              <SidebarMenu className="mt-2 gap-[2.5px]">
                {settingsMenu.project.map((item) => {
                  return (
                    <SidebarMenuButton
                      className={cn({
                        'bg-accent': isActivePath(pathname, item.path, true),
                      })}
                      onClick={() => {
                        navigate(item.path);
                      }}
                      key={item.path}
                    >
                      <span
                        className={cn('font-semibold', {
                          'text-yellow-600 dark:!text-primary': isActivePath(
                            pathname,
                            item.path,
                            true
                          ),
                        })}
                      >
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  );
                })}
              </SidebarMenu>
              <span className="mb-1 mt-3 select-none text-sm font-semibold text-muted-foreground">
                Organization
              </span>
              <SidebarMenu className="mt-2 gap-[2.5px]">
                {settingsMenu.organization.map((item) => {
                  return (
                    <SidebarMenuButton
                      className={cn({
                        'bg-accent': isActivePath(pathname, item.path, true),
                      })}
                      onClick={() => {
                        navigate(item.path);
                      }}
                      key={item.path}
                    >
                      <span
                        className={cn('font-semibold', {
                          'text-yellow-600 dark:!text-primary': isActivePath(
                            pathname,
                            item.path,
                            true
                          ),
                        })}
                      >
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  );
                })}
              </SidebarMenu>
              <span className="mb-1 mt-3 select-none text-sm font-semibold text-muted-foreground">
                User
              </span>
              <SidebarMenu className="mt-2 gap-[2.5px]">
                {settingsMenu.user.map((item) => (
                  <SidebarMenuButton
                    className={cn({
                      'bg-accent': isActivePath(pathname, item.path, true),
                    })}
                    onClick={() => {
                      navigate(item.path);
                    }}
                    key={item.path}
                  >
                    <span
                      className={cn('font-semibold', {
                        'text-yellow-600 dark:!text-primary': isActivePath(
                          pathname,
                          item.path,
                          true
                        ),
                      })}
                    >
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="min-h-0 min-w-0 flex-1 whitespace-normal">
        <Outlet />
      </div>
    </div>
  );
}
