import { Outlet } from 'react-router';

import { ResizableHandle } from '@/components/ui/resizable';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useMediaQuery } from '@/hooks/use-mobile';

import { ConversationList } from './_components/conversation-list';

export default function LiveChat() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="h-[calc(100vh-52px)] w-full overflow-hidden rounded-lg bg-background">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel
          id="conversation-list"
          order={1}
          defaultSize={30}
          minSize={20}
          maxSize={50}
        >
          <ConversationList />
        </ResizablePanel>
        {isDesktop && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel
              id="chat-area"
              order={2}
              defaultSize={70}
              minSize={20}
              maxSize={80}
            >
              <Outlet />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
