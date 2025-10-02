import { useLayoutEffect } from 'react';

import { PageHeader } from '@/components/dashboard/page-header.tsx';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import ChatAssistantPage from './ChatAssistantPage.tsx';

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
        <ChatAssistantPage />
      </div>
    </div>
  );
}
