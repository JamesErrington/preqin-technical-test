import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC } from "react";
import { FirmTable } from "./components/FirmTable";

const queryClient = new QueryClient();

export const App: FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<FirmTable />
		</QueryClientProvider>
	);
};
