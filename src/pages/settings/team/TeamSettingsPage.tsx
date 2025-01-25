import { InviteLink } from "./_components/invite-link";
import { ManageMembers } from "./_components/manage-members";

export async function loader() {
	return {
		title: "Team Settings",
	};
}

export function Component() {
	return (
		<div className="space-y-8 p-6">
			<InviteLink />
			<ManageMembers />
		</div>
	);
}
