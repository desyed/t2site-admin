import { useLayoutEffect } from 'react';
import { Outlet, useParams } from 'react-router';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useMediaQuery } from '@/hooks/use-mobile';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import { ConversationList } from './_components/conversation-list';

export const loader = createDashboardLoader(() => {
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
        <ResizablePanel defaultSize={30} minSize={25} maxSize={60}>
          <ConversationList />
        </ResizablePanel>
        {ticketId && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70} minSize={30} maxSize={80}>
              <Outlet />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
