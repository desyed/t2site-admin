import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SidebarGroup } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { isActivePath } from '@/lib/utils';
import { Link, Outlet, useLocation } from 'react-router';

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

export default function NavSettings() {
  const { pathname } = useLocation();
  return (
    <div className="flex mx-4 gap-2 items-start mt-5">
      <div className="min-w-[12.4rem]">
        {' '}
        <div className="sticky top-20">
          <SidebarGroup>
            <span className="text-sm font-semibold text-muted-foreground mb-1 select-none">
              Project
            </span>
            <SidebarMenu>
              <SidebarMenuItem>
                {projectMenu.map((item) => (
                  <SidebarMenuButton
                    className={cn({
                      'bg-accent': isActivePath(pathname, item.path),
                    })}
                    asChild
                    key={item.path}
                  >
                    <Link to={item.path}>
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                ))}
              </SidebarMenuItem>
            </SidebarMenu>
            <span className="text-sm font-semibold text-muted-foreground mt-3 mb-1 select-none">
              Organization
            </span>
            <SidebarMenu>
              <SidebarMenuItem>
                {organizationMenu.map((item) => (
                  <SidebarMenuButton
                    className={cn({
                      'bg-accent': isActivePath(pathname, item.path),
                    })}
                    asChild
                    key={item.path}
                  >
                    <Link to={item.path}>
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                ))}
              </SidebarMenuItem>
            </SidebarMenu>
            <span className="text-sm font-semibold text-muted-foreground mt-3 mb-1 select-none">
              User
            </span>
            <SidebarMenu>
              <SidebarMenuItem>
                {userMenu.map((item) => (
                  <SidebarMenuButton
                    className={cn({
                      'bg-accent': isActivePath(pathname, item.path),
                    })}
                    asChild
                    key={item.path}
                  >
                    <Link to={item.path}>
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                ))}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </div>
      </div>
      <div className="flex-1 pt-2">
        <Outlet />
      </div>
    </div>
  );
}
