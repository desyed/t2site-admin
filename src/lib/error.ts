import { AxiosError } from "axios";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
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

export function displayFieldsError<T extends FieldValues>(
	form: UseFormReturn<T>,
	errors: Partial<Record<Path<T>, string | string[]>> | null,
) {
	if (errors) {
		for (const key in errors) {
			if (Object.prototype.hasOwnProperty.call(errors, key)) {
				const error = errors[key as Path<T>];
				if (error) {
					const message: string = Array.isArray(error) ? error[0] : error;
					form.setError(key as Path<T>, { message });
				}
			}
		}
	}
}
