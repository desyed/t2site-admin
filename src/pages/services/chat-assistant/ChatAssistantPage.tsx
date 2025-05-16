import { Outlet, useParams } from 'react-router';

import { useMediaQuery } from '@/hooks/use-mobile';

import ChatAssistant from './chat-assistant.tsx';

export default function ChatAssistantPage() {
  const { ticketId } = useParams();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return ticketId && !isDesktop ? (
    <div className="h-[calc(100vh-52px)] w-full overflow-hidden bg-background">
      <Outlet />
    </div>
  ) : (
    <ChatAssistant />
  );
}
