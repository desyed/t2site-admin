import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true, // ✅ Keeps data updated when network reconnects
      refetchOnWindowFocus: false, // ❌ Avoids refetching when switching tabs (improves UX)
      refetchInterval: 1000 * 60 * 1, // 🔄 Auto-refetch every 1 min for fresh data
      retry: 2, // 🔄 Retry failed queries twice before showing an error
      staleTime: 1000 * 60 * 60, // ⏳ Data stays fresh for 60 min before refetching
    },
    mutations: {
      retry: 1, // 🔄 Retry failed mutations once (for form submissions, updates)
    },
  },
});

