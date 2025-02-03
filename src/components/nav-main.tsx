
import type {
  LucideIcon
} from 'lucide-react';

import {
  ChevronRight
} from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  useSidebar,
  SidebarMenuSubItem,

} from '@/components/ui/sidebar';
import { cn, isActivePath } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { pathname } = useLocation();
  const { toggleSidebar, isMobile } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild tooltip={item.title}
                  className={cn({
                    'bg-accent': isActivePath(pathname, item.url),
                  })}
                >
                  {!item.items?.length ? (
                    <Link to={item.url} onClick={() => {
                      if (isMobile) {
                        toggleSidebar();
                      }
                    }}>
                      <span className={cn("flex items-center gap-2 [&_svg]:size-4", {
                        'text-primary': isActivePath(pathname, item.url),
                      })}>
                        {item.icon && <item.icon />}
                        <span className="font-semibold">{item.title}</span>
                      </span>
                    </Link>
                  ) : (
                    <span>
                      {item.icon && <item.icon />}
                      <span className="font-semibold">{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </span>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items?.length && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton className={cn({
                          'bg-accent': isActivePath(pathname, subItem.url),
                        })} asChild>
                          <Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
