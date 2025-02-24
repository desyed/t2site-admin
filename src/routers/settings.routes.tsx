import { Navigate, RouteObject } from "react-router";
import NotFoundSettings from '@/pages/settings/404';

export const settingsRoutes: RouteObject[] =
  [
    {
      index: true,
      element: <Navigate to="/settings/project" />,
    },
    {
      path: '/settings/project',
      children: [
        {
          index: true,
          lazy: () =>
            import('@/pages/settings/project'),
        },
      ],
    },
    {
      path: '/settings/organization',
      children: [
        {
          index: true,
          lazy: () =>
            import(
              '@/pages/settings/organization/general'
            ),
        },
        {
          path: '/settings/organization/members',
          lazy: () =>
            import(
              '@/pages/settings/organization/members'
            ),
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundSettings />,
    },
  ];

