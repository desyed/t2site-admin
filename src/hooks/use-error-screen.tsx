import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

import { handleApiErrorException } from '@/lib/utils';

interface UseErrorScreenOptions {
  onRetry?: () => void;
  resourceName?: string;
}

export function useErrorScreen(options: UseErrorScreenOptions = {}) {
  const { onRetry, resourceName = 'resource' } = options;
  const queryClient = useQueryClient();

  const handleRetry = useCallback(() => {
    if (onRetry) {
      onRetry();
    } else {
      // Default retry behavior - refetch all queries
      queryClient.invalidateQueries();
    }
  }, [onRetry, queryClient]);

  const getErrorFromQuery = useCallback((error: unknown) => {
    // Handle TanStack Query errors
    if (error && typeof error === 'object') {
      // Check if it's a TanStack Query error
      if ('status' in error || 'data' in error) {
        return error;
      }

      // Check if it's an Axios error
      if (error instanceof AxiosError) {
        return error;
      }

      // Check if it's a standard Error
      if (error instanceof Error) {
        return error;
      }
    }

    return error;
  }, []);

  const shouldShowErrorScreen = useCallback((error: unknown) => {
    if (!error) return false;

    const { status, code } = handleApiErrorException(error, false);

    // Show error screen for network errors, 4xx, and 5xx errors
    return (
      code === 'ERR_NETWORK' ||
      code === 'FETCH_ERROR' ||
      (status && status >= 400 && status < 600)
    );
  }, []);

  return {
    handleRetry,
    getErrorFromQuery,
    shouldShowErrorScreen,
    resourceName,
  };
}

// Hook specifically for TanStack Query errors
export function useQueryErrorScreen(
  queryError: unknown,
  options: UseErrorScreenOptions = {}
) {
  const {
    handleRetry,
    getErrorFromQuery,
    shouldShowErrorScreen,
    resourceName,
  } = useErrorScreen(options);

  const error = getErrorFromQuery(queryError);
  const showErrorScreen = shouldShowErrorScreen(error);

  return {
    error,
    showErrorScreen,
    handleRetry,
    resourceName,
  };
}

// Hook for handling mutation errors
export function useMutationErrorScreen(
  mutationError: unknown,
  options: UseErrorScreenOptions = {}
) {
  const {
    handleRetry,
    getErrorFromQuery,
    shouldShowErrorScreen,
    resourceName,
  } = useErrorScreen(options);

  const error = getErrorFromQuery(mutationError);
  const showErrorScreen = shouldShowErrorScreen(error);

  return {
    error,
    showErrorScreen,
    handleRetry,
    resourceName,
  };
}
