import { SiteBreadcrumb } from '@/components/site-breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function DashBoardHeader() {
  return (
    <header className="fixed z-50 flex w-full shrink-0 items-center gap-2 border-b border-border/50 bg-sidebar shadow-sm transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14 max-sm:py-2 sm:h-14">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-1 h-4" />
        <SiteBreadcrumb />
      </div>
    </header>
  );
}
