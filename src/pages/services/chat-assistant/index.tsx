import { useLayoutEffect } from 'react';
import { redirect, useParams } from 'react-router';

import { createDashboardLoader } from '@/middlewares/auth-middleware';

import ChatAssistantPage from './ChatAssistantPage.tsx';

export const loader = createDashboardLoader(async () => {
  const { projectId } = useParams();
  if (!projectId) {
    return redirect('/');
  }
  return {
    projectId: projectId,
  };
});

export function Component() {
  useLayoutEffect(() => {
    document.documentElement.style.overflowY = 'auto';
  }, []);

  return <ChatAssistantPage />;
}
