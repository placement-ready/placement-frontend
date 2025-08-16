"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

interface ProvidersProps {
	children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5, // 5 minutes
						gcTime: 1000 * 60 * 10, // 10 minutes cacheTime
						refetchOnWindowFocus: false,
						refetchOnReconnect: true,
						refetchOnMount: false,
						retry: 3,
						retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
					},
					mutations: {
						retry: 1,
						retryDelay: 1000,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</SessionProvider>
		</QueryClientProvider>
	);
}
