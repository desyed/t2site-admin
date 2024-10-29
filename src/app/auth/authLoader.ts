import { getQuery } from "@/lib/utils";
import { authStore } from "./authStore";

export async function authPreSessionLoader() {
	// Pre session check
	const oauth_login = getQuery("oauth_login");

	const actSe = localStorage.getItem("t2_se_act");

	if (actSe === "activate" || oauth_login === "success") {
		// Prefetch session
		await authStore.fetchSession();

		// Always attempt to remove 'oauth_login' from the URL
		if (oauth_login) {
			const url = new URL(window.location.href);
			url.searchParams.delete("oauth_login");
			localStorage.setItem("t2_se_act", "activate");
			window.history.replaceState(
				{},
				document.title,
				url.pathname + url.search,
			);
		}
	}
	return [];
}
