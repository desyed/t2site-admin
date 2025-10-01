import { createDashboardLoader } from '@/middlewares/auth-middleware';

import { EmailDashboard } from './components/email-dashboard';

export const loader = createDashboardLoader(async () => {
  return {};
});

export const Component = () => {
  return <EmailDashboard />;
};
