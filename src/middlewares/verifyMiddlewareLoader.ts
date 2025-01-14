import { authPreSessionLoader } from "@/app/auth/authLoader";
import { redirect } from "react-router";

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