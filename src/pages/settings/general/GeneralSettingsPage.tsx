import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { delay } from "@/lib/utils";
import { Upload } from "lucide-react";
import { DeleteProjectAlert } from "./_components/delete-project-alert";

export async function loader() {
	await delay(500);
	return {
		title: "General Settings",
	};
}

export function Component() {
	return (
		<div className="max-w-xl p-6">
			<form className="space-y-5">
				<div className="flex items-center gap-5">
					<Avatar className="size-20 rounded-sm">
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="Workspace Avatar"
						/>
						<AvatarFallback>WS</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<h2 className="text-sm font-semibold">Workspace Logo</h2>
						<div className="flex items-center gap-2">
							<Button size={"sm"} variant={"outline"}>
								<Upload className="size-4 mr-1" />
								Change Logo
							</Button>
							<Button disabled size={"sm"} variant={"outline"}>
								Remove
							</Button>
						</div>
						<p className="text-xs text-muted-foreground">
							.png, or .jpg files up to 10MB at least 400px by 400px
						</p>
					</div>
				</div>

				<div className="space-y-0.5">
					<Label>Workspace Name</Label>
					<Input placeholder="My Workspace" />
				</div>

				<div className="space-y-0.5">
					<Label>Workspace URL</Label>
					<Input placeholder="my-workspace" />
				</div>

				<Button>Update</Button>
			</form>

			<Separator className="my-4" />

			<div className="flex items-center justify-between">
				<div className="w-7/12">
					<h3 className="text-destructive font-medium">Delete Workspace</h3>
					<p className="text-xs text-muted-foreground">
						Once you delete your workspace, there is no going back. Please be
						certain.
					</p>
				</div>
				<DeleteProjectAlert>
					<Button size={"sm"} variant={"destructive"}>
						Delete Workspace
					</Button>
				</DeleteProjectAlert>
			</div>
		</div>
	);
}
