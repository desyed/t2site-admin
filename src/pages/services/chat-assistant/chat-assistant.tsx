import { Outlet } from 'react-router';

import { ResizableHandle } from '@/components/ui/resizable';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useMediaQuery } from '@/hooks/use-mobile';

import { ConversationList } from './_components/conversation-list';

export default function ChatAssistant() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="h-[calc(100vh-52px)] w-full overflow-hidden bg-background">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel
          id="conversation-list"
          order={1}
          defaultSize={30}
          minSize={20}
          maxSize={40}
        >
          <ConversationList />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {isDesktop && (
          <>
            <ResizablePanel
              id="chat-area"
              order={2}
              defaultSize={70}
              minSize={60}
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
