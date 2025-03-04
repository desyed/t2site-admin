import type { RouteObject } from 'react-router';

export const servicesRoutes: RouteObject[] = [
  {
    path: '/web-analytics',
    lazy: () => import('@/pages/services/web-analytics'),
  },
];
