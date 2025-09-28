import type { LoaderFunction } from '@remix-run/router';

import { useLoaderData, type Params } from 'react-router';

import { delay } from '@/lib/utils';
import { createPrivateLoader } from '@/middlewares/auth-middleware';

export type ProjectGeneralSettingsLoaderData = {
  message: string;
};

export const loader: LoaderFunction<Params> = createPrivateLoader(
  async (request) => {
    console.log(request);
    await delay(1000);
    return {
      message: 'Hello General',
    };
  }
);

export function Component() {
  const { message } = useLoaderData<ProjectGeneralSettingsLoaderData>();
  return <div>{message}</div>;
}
