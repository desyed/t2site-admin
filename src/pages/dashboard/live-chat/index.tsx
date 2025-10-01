import { createDashboardLoader } from '@/middlewares/auth-middleware';

import { LiveChatDashboard } from './components/live-chat-dashboard';

export const loader = createDashboardLoader(async () => {
  return {};
});

export const Component = () => {
  return <LiveChatDashboard />;
};
