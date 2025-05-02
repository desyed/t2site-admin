import { createDashboardLoader } from '@/middlewares/auth-middleware';

import { ChatArea } from '../_components/chat-area';

export const loader = createDashboardLoader(() => {
  return {};
});

export function Component() {
  return <ChatArea />;
}
