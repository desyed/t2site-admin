import { preFetchInvitedMembers } from "@/app/organization/organization-prefetch";
import Members from "./_components/members";


export async function loader() {
  await preFetchInvitedMembers();
  return [];
}

export function Component() {
  return (
    <div>
      <Members />
    </div>
  );
}


