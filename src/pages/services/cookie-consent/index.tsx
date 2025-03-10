import { createDashboardLoader } from '@/middlewares/auth-middleware';

export const loader = createDashboardLoader(() => {
  return {
    title: 'Cookie consent',
  };
});

export function Component() {
  return <div> Cookie consent </div>;
}
