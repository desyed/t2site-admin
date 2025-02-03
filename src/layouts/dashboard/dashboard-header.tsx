import { Link, useLocation } from 'react-router';

import { ProjectsMenu } from '@/components/projects/projects-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function DashBoardHeader() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <header className="fixed z-50 flex  sm:h-14 w-full shrink-0 items-center gap-2 border-b border-border/50 bg-sidebar shadow-sm transition-[width,height] max-sm:py-2 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-1 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <ProjectsMenu />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem >
              <Link to={pathSegments[0]}>
                {pathSegments.length > 0
                  ? pathSegments[0].charAt(0).toUpperCase() +
                  pathSegments[0].slice(1)
                  : 'Dashboard'}
              </Link>
            </BreadcrumbItem>
            {pathSegments.length > 1 && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Link to={pathSegments[1]}>
                      {pathSegments[1].charAt(0).toUpperCase() +
                        pathSegments[1].slice(1)}
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
