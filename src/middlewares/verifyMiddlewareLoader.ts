import { redirect } from "react-router";

import { authPreSessionLoader } from "@/app/auth/auth-loader";

export async function verifyMiddlewareLoader () { 
  const authUser = await authPreSessionLoader();  
  if (!authUser) {
    return redirect('/login');
  }
  if (authUser?.emailVerified) {
    return redirect('/');
  }
  return null;
}