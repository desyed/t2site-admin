import { useLayoutEffect } from 'react';

import { PageHeader } from '@/components/dashboard/page-header.tsx';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import LiveChatPage from './live-chat-page.tsx';

export const loader = createDashboardLoader(async () => {
  return {};
});

export function Component() {
  useLayoutEffect(() => {
    document.documentElement.style.overflowY = 'auto';
  }, []);

  return (
    <div>
      <PageHeader title="Live Chat" />
      <div className="dashboard-container space-y-6">
        <LiveChatPage />
      </div>
    </div>
  );
}
