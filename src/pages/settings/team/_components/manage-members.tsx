import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { useMemo } from "react";
import type { Member } from "../_types";
import { columns } from "./members-column";
import { MembersDataTable } from "./members-data-table";

const data: Member[] = [
	{
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		role: "admin",
		joinedAt: new Date("2023-01-01"),
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane@example.com",
		role: "member",
		joinedAt: new Date("2023-02-15"),
	},
	{
		id: "3",
		name: "Bob Johnson",
		email: "bob@example.com",
		role: "member",
		joinedAt: new Date("2023-03-20"),
	},
	{
		id: "4",
		name: "Alice Brown",
		email: "alice@example.com",
		role: "member",
		joinedAt: new Date("2023-04-10"),
	},
];

export function ManageMembers() {
	const memoizedColumns = useMemo(() => columns, []);

	return (
		<div>
			<h3 className="text-lg font-medium mb-3">Manage Members</h3>
			<div className="flex items-center justify-between">
				<div className="relative">
					<Search className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
					<Input placeholder="Search members..." className="h-8 w-72 pl-8" />
				</div>

				<div className="flex items-center gap-1.5">
					<Button size={"sm"}>
						<UserPlus className="size-4" />
						Invite members
					</Button>
				</div>
			</div>

			<MembersDataTable data={data} columns={memoizedColumns} />
		</div>
	);
}
