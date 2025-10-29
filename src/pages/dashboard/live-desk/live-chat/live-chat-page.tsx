import { Outlet, useParams } from 'react-router';

import { useMediaQuery } from '@/hooks/use-mobile';

import LiveChat from './live-chat.tsx';

export default function LiveChatPage() {
  const { ticketId } = useParams();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return ticketId && !isDesktop ? (
    <div className="h-[calc(99vh)] w-full overflow-hidden bg-background">
      <Outlet />
    </div>
  ) : (
    <LiveChat />
  );
}
