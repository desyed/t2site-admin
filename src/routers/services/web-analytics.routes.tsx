import type { RouteObject } from 'react-router';

import NotFoundWebAnalytics from '@/pages/services/web-analytics/404';

export const webAnalyticsRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () => import('@/pages/services/web-analytics'),
  },
  {
    path: '*',
    element: <NotFoundWebAnalytics />,
  },
];
