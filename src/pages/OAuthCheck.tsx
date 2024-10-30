import { useEffect } from "react";
import { authStore } from "@/app/auth/authStore";
import { getQuery } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import Brand from "@/components/Brand";
import { ModeToggle } from "@/components/mode-toggle";

export default function OAuthCheck() {
  const navigate = useNavigate();
  useEffect(() => {
    async function initSession() {
      const oauth_login = getQuery("oauth_login");
      if (oauth_login === "success") {
        const from = getQuery("rp") ?? "/";
        await authStore.fetchSession();
        navigate(from);
      }
    }
    initSession();
  }, []);
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex h-[90px] items-center justify-between px-6 sm:px-10">
        <div>
          <Brand />
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
      <div className="mt-10 flex flex-1 flex-col items-center gap-5 px-5 ">
        <h1 className="text-xl font-bold">Authentication Checkpoint</h1>
        <p className="text-center text-muted-foreground">
          Please wait while we verify your credentials...
        </p>
      </div>
    </div>
  );
}
