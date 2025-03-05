import { createPrivateLoader } from '@/middlewares/auth-middleware';

import Profile from './_components/Profile';

export const loader = createPrivateLoader(async () => {
  return null;
});

export function Component() {
  return <Profile />;
}
