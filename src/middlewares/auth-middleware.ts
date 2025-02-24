import { LoaderFunction, replace } from "react-router";

import { authPreSessionLoader } from "@/app/auth/auth-loader";

export const authMiddlewareLoader: LoaderFunction = async () => {
  const authUser = await authPreSessionLoader();
  if (authUser && authUser?.emailVerified) {
    return replace('/');
  }
  if (authUser && !authUser?.emailVerified) {
    return replace('/verify');
  }
  return null;
}

export const verifyMiddlewareLoader: LoaderFunction = async ({ request }) => {
  const authUser = await authPreSessionLoader();
  const pathname = new URL(request.url).pathname;
  if (!authUser) {
    window.localStorage.setItem('redirect_to', pathname);
    return replace('/login');
  }
  if (authUser?.emailVerified) {
    window.localStorage.setItem('redirect_to', pathname);
    return replace('/');
  }
  return null;
}


export const createPrivateLoader = (loader?: LoaderFunction): LoaderFunction => {
  return async (context) => {
    const { request } = context;
    const authUser = await authPreSessionLoader();
    if (!authUser) {
      const pathname = new URL(request.url).pathname;
      window.localStorage.setItem('redirect_to', pathname);
      return replace('/login');
    }
    if (authUser && !authUser.emailVerified) {
      const pathname = new URL(request.url).pathname;
      window.localStorage.setItem('redirect_to', pathname);
      return replace('/verify');
    }
    return loader ? loader(context) : null;
  };
};


export const privateMiddlewareLoader: LoaderFunction = createPrivateLoader()