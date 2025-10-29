import { createDashboardLoader } from '@/middlewares/auth-middleware';

import { FacebookDashboard } from './components/facebook-dashboard';

export const loader = createDashboardLoader(async () => {
  return {};
});

export const Component = () => {
  return <FacebookDashboard />;
};
