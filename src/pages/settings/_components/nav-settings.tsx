import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SidebarMenu, SidebarMenuButton } from '@/components/ui/sidebar';
import { SidebarGroup } from '@/components/ui/sidebar';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isActivePath } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useIsMobile } from '@/hooks/use-mobile';

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
  }, [pathname]);

  return (
    <div className="flex mx-4 sm:gap-5 lg:gap-10 items-start mt-5 md:flex-row flex-col">
      <div className="md:sticky top-16 md:min-w-[12.4rem] max-md:w-full max-md:mb-6 max-md:pb-2 max-md:border-b bg-background">
        <Collapsible open={open} onOpenChange={setOpen}>
          <div className="max-md:block hidden ">
            <Button
              variant="ghost"
              size="default"
              className="w-full text-start px-2 flex-start"
              onClick={() => setOpen(!open)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="capitalize">{activeMenuLabel}</span>
                <div>
                  {open ? (
                    <ChevronDownIcon className="mt-[4px] h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="mt-[2px] h-4 w-4" />
                  )}
                </div>
              </div>
            </Button>
          </div>

          <CollapsibleContent>
            <SidebarGroup>
              <span className="text-sm font-semibold text-muted-foreground mb-1 select-none">
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
                      <span className="font-semibold">{item.label}</span>
                    </SidebarMenuButton>
                  );
                })}
              </SidebarMenu>
              <span className="text-sm font-semibold text-muted-foreground mt-3 mb-1 select-none">
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
                      <span className="font-semibold">{item.label}</span>
                    </SidebarMenuButton>
                  );
                })}
              </SidebarMenu>
              <span className="text-sm font-semibold text-muted-foreground mt-3 mb-1 select-none">
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
                    <span className="font-semibold">{item.label}</span>
                  </SidebarMenuButton>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="flex-1 pt-5">
        <Outlet />
      </div>
    </div>
  );
}
