import { delay } from "@/lib/utils";

export async function loader() {
	await delay(1000);
	return {
		title: "settings",
	};
}
export function Component() {
	return (
		<div className="p-10">
			<h1 className="text-2xl font-semibold">Settings</h1>
		</div>
	);
}
