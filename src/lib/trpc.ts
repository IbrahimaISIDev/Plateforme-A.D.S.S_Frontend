import { createTRPCReact } from '@trpc/react-query';
import { QueryClient } from '@tanstack/react-query';
// Mock AppRouter type until the backend is connected
export type AppRouter = any;

export const trpc = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes
            retry: 1,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 1,
        },
    },
});
