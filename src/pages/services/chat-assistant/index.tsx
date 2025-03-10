import { useLayoutEffect } from 'react';

import { createDashboardLoader } from '@/middlewares/auth-middleware';

import CustomerChatInterface from './_components/chat-assistant-interface';

export const loader = createDashboardLoader(() => {
  return {
    title: 'Cookie consent',
  };
});

export function Component() {
  useLayoutEffect(() => {
    document.documentElement.style.overflowY = 'auto';
  }, []);

  return <CustomerChatInterface />;
}
