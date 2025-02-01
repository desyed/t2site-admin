/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, type AxiosResponse } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { toast as toastMessage } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(duration: number) {
  return new Promise((resolve, reject) => {
    if (!duration || Number.isNaN(duration)) {
      reject('Invalid Duration parameter');
    }
    setTimeout(() => {
      resolve(duration);
    }, duration);
  });
}

/**
 * Extracts up to two initials from a full name.
 * @param name - The full name to extract initials from.
 * @returns A string containing up to two initials, or an empty string if no valid initials are found.
 */
export function getNameInitials(
  name: string,
  length: number = 1,
  uppercase: boolean = true
): string {
  const initials = name
    .split(' ')
    .map((part) => part.at(0))
    .filter(Boolean) // Remove any undefined values if only one name exists
    .slice(0, length) // Take only the first two initials
    .join('');

  return uppercase ? initials.toUpperCase() : initials;
}

export function getQuery(key: string) {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

export function removeQueryFromUrl(name: string) {
  const url = new URL(window.location.href);
  url.searchParams.delete(name);
  window.history.replaceState({}, document.title, url.pathname + url.search);
}

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
export function isValidPassword(password: string) {
  return passwordRegex.test(password);
}

export type EmailAddress = string & {
  __brand: 'EmailAddress';
};

export function isValidEmail(email: string): email is EmailAddress {
  return z.string().email().safeParse(email).success;
}

export function handleApiErrorException<TError = any>(
  err: unknown,
  toast: boolean = false
) {
  let message = 'An unexpected error occurred. Please try again.';
  let errors: TError | null = null;
  let responseType = null;
  let code = 'UNKNOWN';
  let status = null;
  if (err instanceof AxiosError) {
    status = err.response?.status;
    code = err.response?.data?.code ?? err.code;

    if (err.code === 'ERR_NETWORK') {
      message = 'Please check your internet connection.';
      responseType = 'Connection Failed';
      toast &&
        toastMessage.warning(responseType, {
          description: message,
          position: 'top-center',
        });
    } else if (status === 422) {
      message = 'Request is unprocessable.';
      responseType = 'Unprocessable Entity';
      errors = err.response?.data?.error as TError;
      toast &&
        toastMessage.warning(responseType, {
          description: message,
          position: 'top-center',
        });
    } else if (status === 400) {
      responseType = 'Bad Request';
      message = err.response?.data?.message ?? 'Please check your input.';
      toast &&
        toastMessage.warning(responseType, {
          description: message,
          position: 'top-center',
        });
    } else if (status === 401) {
      message =
        err.response?.data?.message ??
        'You are not authorized to access this resource. Please log in and try again.';
      responseType = 'Unauthorized';
      toast &&
        toastMessage.warning(responseType, {
          description: message,
          position: 'top-center',
        });
    } else if (status === 403) {
      message =
        err.response?.data?.message ??
        "You don't have permission to perform this action.";
      responseType = 'Forbidden';
      toast &&
        toastMessage.warning(responseType, {
          description: message,
          position: 'top-center',
        });
    } else if (status === 404) {
      message =
        err.response?.data?.message ??
        'The requested resource could not be found.';
      responseType = 'Not Found';
      toast &&
        toastMessage.warning(responseType, {
          description: message,
          position: 'top-center',
        });
    } else if (status === 500) {
      message = 'Server Error: Please try again later.';
      responseType = 'Server Error';
      toast &&
        toastMessage.error(responseType, {
          description: message,
        });
    } else if (status === 503) {
      message = 'Service Unavailable: The server is currently unavailable.';
      responseType = 'Service Unavailable';
      toast &&
        toastMessage.error(responseType, {
          description: message,
          position: 'top-center',
        });
    }
  } else {
    message = 'Unexpected error: Please try again later.';
    responseType = 'Error';
    toast &&
      toastMessage.error(responseType, {
        description: message,
      });
    logDev('Unexpected error:', err);
  }

  return { errors, responseType, message, code, status };
}

export async function handleApi<TResponse = any, TError = any>(
  apiHandler: (payload: any) => Promise<AxiosResponse<any, any>>,
  payload: object = {},
  config: {
    toast?: boolean;
  } = {}
): Promise<{
  success: boolean;
  data: TResponse | null;
  message: string;
  errors: TError | null;
  responseType: string | null;
  code: string | null;
}> {
  const { toast } = config;
  try {
    const result = await apiHandler(payload);
    return {
      success: true,
      data: result.data as TResponse,
      message: result.data?.message ?? null,
      errors: null,
      responseType: 'OK',
      code: null,
    };
  } catch (err) {
    const { errors, message, responseType, code } = handleApiErrorException(
      err,
      toast
    );
    return { success: false, message, errors, data: null, responseType, code };
  }
}


export function isActivePath(path: string, url: string, strict: boolean = false): boolean {
  if (url === '/') {
    return path === '/';
  }
  return strict ? path === url : path.startsWith(url);
}

export function logDev(...message: any[]) {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(...message);
  }
}
