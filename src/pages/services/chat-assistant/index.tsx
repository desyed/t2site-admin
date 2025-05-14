import { useLayoutEffect } from 'react';
import { Outlet, redirect, useParams } from 'react-router';

import { authStore } from '@/app/auth/auth.store';
import { preFetchProjectServices } from '@/app/project/project.prefetch';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useMediaQuery } from '@/hooks/use-mobile';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import { ConversationList } from './_components/conversation-list';

export const loader = createDashboardLoader(async () => {
  const currentProject = authStore.getCurrentProject();
  if (!currentProject) {
    return redirect('/projects');
  }
  await preFetchProjectServices(currentProject.id);
  return {};
});

export function Component() {
  const { ticketId } = useParams();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  useLayoutEffect(() => {
    document.documentElement.style.overflowY = 'auto';
  }, []);

  if (ticketId && !isDesktop) {
    return (
      <div className="h-[calc(100vh-52px)] w-full overflow-hidden bg-background">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-52px)] w-full overflow-hidden bg-background">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={25} minSize={10} maxSize={50}>
          <ConversationList />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {isDesktop && (
          <ResizablePanel defaultSize={75} minSize={30} maxSize={80}>
            <Outlet />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
