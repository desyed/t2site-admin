import { createDashboardLoader } from '@/middlewares/auth-middleware';

import { WhatsappDashboard } from './components/whatsapp-dashboard';

export const loader = createDashboardLoader(async () => {
  return {};
});

export const Component = () => {
  return <WhatsappDashboard />;
};
