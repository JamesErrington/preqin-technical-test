import {
	QueryClient,
	QueryClientProvider,
	QueryErrorResetBoundary,
} from "@tanstack/react-query";
import type { FC } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { FirmTable } from "./components/FirmTable";

const queryClient = new QueryClient();

export const App: FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<QueryErrorResetBoundary>
				{({ reset }) => (
					<ErrorBoundary onReset={reset} fallbackRender={fallbackRender}>
						<FirmTable />
					</ErrorBoundary>
				)}
			</QueryErrorResetBoundary>
		</QueryClientProvider>
	);
};

const fallbackRender = ({ resetErrorBoundary }: FallbackProps) => {
	return (
		<div className="error">
			<h3>An error occured. Please try again</h3>
			<button type="button" onClick={resetErrorBoundary}>
				Reload
			</button>
		</div>
	);
};
