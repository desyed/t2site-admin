"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Member } from "../_types";

export const columns: ColumnDef<Member>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => {
			const member = row.original;
			return (
				<div className="flex items-center gap-3">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={`https://avatar.vercel.sh/${member.email}`}
							alt={member.name}
						/>
						<AvatarFallback>
							{member.name.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium">{member.name}</p>
						<p className="text-sm text-muted-foreground">{member.email}</p>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "role",
		header: "Role",
		cell: ({ row }) => {
			return (
				<Badge
					variant={row.original.role === "admin" ? "default" : "secondary"}
				>
					{row.original.role}
				</Badge>
			);
		},
	},
	{
		accessorKey: "joinedAt",
		header: "Joined",
		cell: ({ row }) => {
			return new Date(row.original.joinedAt).toLocaleDateString();
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(row.original.email)}
						>
							Copy email
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Change role</DropdownMenuItem>
						<DropdownMenuItem className="text-destructive">
							Remove from team
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
