import { handleApi } from "@/lib/utils";
import type { AxiosResponse } from "axios";
import { useState } from "react";

type ApiMutationState<TResponse, TError> = {
	data: TResponse | null;
	loading: boolean;
	success: boolean;
	message: string | null;
	errors: TError | null;
	code: string | null;
};

export function useApi<TResponse = unknown, TError = any>(
	apiHandler: (payload: object) => Promise<AxiosResponse<any, any>>,
	config: {
		toast?: boolean;
	} = {},
) {
	const [state, setState] = useState<ApiMutationState<TResponse, TError>>({
		data: null,
		loading: false,
		success: false,
		message: null,
		errors: null,
		code: null,
	});

	const executeMutation = async (payload: object = {}) => {
		setState((prev) => ({
			...prev,
			loading: true,
			errorMessage: null,
			errors: null,
		}));

		const { success, data, message, errors, code } = await handleApi<
			TResponse,
			TError
		>(
			apiHandler,
			payload,
			config,
		);

		setState({
			data,
			loading: false,
			success,
			message: message,
			errors: errors,
			code: code,
		});

		return { success, data, message, errors, code };
	};

	return { ...state, executeMutation };
}
