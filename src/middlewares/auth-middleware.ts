import type { ActionFunction, LoaderFunction } from 'react-router';

import { replace } from 'react-router';

import { authPreSessionLoader } from '@/app/auth/auth.loader';
import {
  preFetchProject,
  preFetchProjects,
} from '@/app/project/project.prefetch';

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

export const createPrivateAction = (
  action?: ActionFunction
): ActionFunction => {
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
    return action ? action(context) : null;
  };
};

export const createDashboardLoader = (
  loader?: LoaderFunction
): LoaderFunction => {
  return createPrivateLoader(async (context) => {
    await preFetchProject(context.params.projectId ?? '');
    await preFetchProjects();
    return loader ? loader(context) : null;
  });
};

export const privateLoader: LoaderFunction = createPrivateLoader();
export const dashboardLoader: LoaderFunction = createDashboardLoader();
