import { getQuery } from "@/lib/utils";
import { authStore } from "./authStore";

export async function authPreSessionLoader() {
	// Pre session check
	const oauth_login = getQuery("oauth_login");
	if (authStore.accessToken || oauth_login === "success") {
		await authStore.fetchSession();

		// Always attempt to remove 'oauth_login' from the URL
		if (oauth_login) {
			const url = new URL(window.location.href);
			url.searchParams.delete("oauth_login");
			window.history.replaceState(
				{},
				document.title,
				url.pathname + url.search,
			);
		}
	}
	return [];
}
