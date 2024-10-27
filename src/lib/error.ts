import { AxiosError } from "axios";
import { toast } from "sonner";

export function handleApiMutationError(err: unknown) {
	if (err instanceof AxiosError) {
		if (err?.response?.status) {
			if (err?.response.status > 499) {
				toast.error("Server Error", {
					description: "Something went wrong, please try again later",
					position: "top-center",
				});
			}
			if (err?.response.status === 400) {
				toast.warning("Invalid Request", {
					position: "top-center",
				});
			}
		}
	} else {
		toast.error("Connection Failed", {
			description: "Check your internet connection",
			position: "top-center",
		});
	}
}
