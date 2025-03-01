import type { RouteObject } from 'react-router';

import { webAnalyticsRoutes } from '@/routers/services/web-analytics.routes';

export const servicesRoutes: RouteObject[] = [
  {
    path: '/services/web-analytics',
    children: webAnalyticsRoutes,
  },
];
