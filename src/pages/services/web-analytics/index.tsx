import type { LoaderFunction } from 'react-router';

import { createPrivateLoader } from '@/middlewares/auth-middleware';

import WebAnalytics from './_components/web-analytics';

export const loader: LoaderFunction = createPrivateLoader(async () => {
  return [];
});

export function Component() {
  return <WebAnalytics />;
}
