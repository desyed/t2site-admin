import { createDashboardLoader } from '@/middlewares/auth-middleware';

import WebAnalytics from './_components/web-analytics';

export const loader = createDashboardLoader(() => {
  return {
    title: 'Web analytics',
  };
});

export function Component() {
  return <WebAnalytics />;
}
