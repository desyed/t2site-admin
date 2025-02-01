import { redirect } from "react-router";

import { authPreSessionLoader } from "@/app/auth/auth-loader";

export async function authMiddlewareLoader() {
  const authUser = await authPreSessionLoader();
  if (authUser && authUser?.emailVerified) {
    return redirect('/');
  }
  if (authUser && !authUser?.emailVerified) {
    return redirect('/verify');
  }
  return null;
}