import { redirect } from "react-router";

import { authPreSessionLoader } from "@/app/auth/authLoader";

export async function privateMiddlewareLoader() {
  const authUser = await authPreSessionLoader();
  if (!authUser) {
    return redirect('/login');
  }
  if (!authUser.emailVerified) {
    return redirect('/verify');
  }
  return null;
}