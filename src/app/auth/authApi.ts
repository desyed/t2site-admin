import { api } from "@/lib/api";

/**
 * @DELETE /auth/logout
 */
export function logoutMutaion() {
	return api.delete("/auth/logout");
}

/**
 * @DELETE /auth/refresh
 */
export function getTokenQuery() {
	return api.delete("/auth/refresh");
}

/**
 * @GET /session
 */
export function getSessionQuery() {
	return api.get("/session");
}
