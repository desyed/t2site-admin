'use client';

import { useState, useEffect } from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useMediaQuery } from '@/hooks/use-mobile';

import { ChatArea } from './chat-area';
import { ConversationList } from './conversation-list';

export default function ChatAssistantInterface() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >('demo-1');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Reset sidebar to open on desktop view
  useEffect(() => {
    if (isDesktop) {
      setSidebarOpen(true);
    }
  }, [isDesktop]);

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  };

  const handleBackToList = () => {
    setSidebarOpen(true);
  };

  return (
    <div className="h-[calc(100vh-52px)] w-full overflow-hidden bg-background">
      {isDesktop ? (
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
            <ConversationList
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <ChatArea
              conversationId={selectedConversation}
              onBackToList={handleBackToList}
              showBackButton={!isDesktop}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="flex h-full flex-col">
          {sidebarOpen ? (
            <ConversationList
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
            />
          ) : (
            <ChatArea
              conversationId={selectedConversation}
              onBackToList={handleBackToList}
              showBackButton={true}
            />
          )}
        </div>
      )}
    </div>
  );
}
