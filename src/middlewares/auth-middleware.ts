import type { LoaderFunction } from 'react-router';

import { replace } from 'react-router';

import { authPreSessionLoader } from '@/app/auth/auth.loader';

export const authMiddlewareLoader: LoaderFunction = async () => {
  const { user } = await authPreSessionLoader();
  if (user && user?.emailVerified) {
    return replace('/');
  }
  if (user && !user?.emailVerified) {
    return replace('/verify');
  }
  return null;
};

export const verifyMiddlewareLoader: LoaderFunction = async ({ request }) => {
  const { user } = await authPreSessionLoader();
  const pathname = new URL(request.url).pathname;
  if (!user) {
    window.localStorage.setItem('redirect_to', pathname);
    return replace('/login');
  }
  if (user?.emailVerified) {
    window.localStorage.setItem('redirect_to', pathname);
    return replace('/');
  }
  return null;
};

export const createPrivateLoader = (
  loader?: LoaderFunction
): LoaderFunction => {
  return async (context) => {
    const { request } = context;
    const { user } = await authPreSessionLoader();
    if (!user) {
      const pathname = new URL(request.url).pathname;
      window.localStorage.setItem('redirect_to', pathname);
      return replace('/login');
    }
    if (user && !user.emailVerified) {
      const pathname = new URL(request.url).pathname;
      window.localStorage.setItem('redirect_to', pathname);
      return replace('/verify');
    }
    return loader ? loader(context) : null;
  };
};

export const createDashboardLoader = (
  loader?: LoaderFunction
): LoaderFunction => {
  return createPrivateLoader(async (context) => {
    // const authUser = await authPreSessionLoader();
    // const { currentProject } = await authPreSessionLoader();

    // if (!currentProject) {
    //   return replace('/projects');
    // }

    return loader ? loader(context) : null;
  });
};

export const dashboardLoader: LoaderFunction = createDashboardLoader();
