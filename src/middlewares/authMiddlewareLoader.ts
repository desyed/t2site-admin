import { authPreSessionLoader } from "@/app/auth/authLoader";
import { redirect } from "react-router";

export async function authMiddlewareLoader () {
  const authUser = await authPreSessionLoader();
  if (authUser && authUser?.emailVerified) {
    return redirect('/');
  }
  if (authUser && !authUser?.emailVerified) {
    return redirect('/verify');
  }
  return null;
}