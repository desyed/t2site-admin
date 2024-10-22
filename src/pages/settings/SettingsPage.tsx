import { delay } from "@/lib/utils";
import { redirect } from "react-router-dom";

export async function loader() {
	await delay(1000);
	return redirect("/settings/general");
}

export function Component() {
	return null;
}
