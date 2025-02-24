import { preFetchInvitedMembers } from "@/app/organization/organization-prefetch";
import Members from "./_components/members";
import { LoaderFunction } from "react-router";
import { createPrivateLoader } from "@/middlewares/auth-middleware";

export const loader: LoaderFunction = createPrivateLoader(async () => {
  await preFetchInvitedMembers();
  return [];
})

export function Component() {
  return <div>
    <Members />
  </div>
}


