import { delay } from "@/lib/utils";
import { InviteLink } from "./_components/invite-link";
import { ManageMembers } from "./_components/manage-members";

export async function loader() {
	await delay(1000);
	return {
		title: "Team Settings",
	};
}

export function Component() {
	return (
		<div className="p-6 space-y-8">
			<InviteLink />
			<ManageMembers />
		</div>
	);
}
