import { getProfileQuery, getSessionQuery } from "@/app/auth/authApi";
import { Button } from "@/components/ui/button";
import { delay } from "@/lib/utils";

export async function loader() {
	await delay(1000);
	return {
		title: "Dashboard",
	};
}
export function Component() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-5 pt-0 mt-5">
			<div className="gap-4 flex">
				<Button
					onClick={async () => {
						const session = await getSessionQuery();
						console.log(session.data);
					}}
				>
					Fetch Session If user is just authenticate
				</Button>
				<Button
					onClick={async () => {
						const profile = await getProfileQuery();
						console.log(profile.data);
					}}
				>
					Fetch Profile If user is verified
				</Button>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl bg-muted" />
				<div className="aspect-video rounded-xl bg-muted" />
				<div className="aspect-video rounded-xl bg-muted" />
			</div>
			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted md:min-h-min" />
		</div>
	);
}
