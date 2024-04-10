import { QueryErrorResetBoundary } from "@tanstack/react-query";
import type { FC } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { InvestorDetail } from "../components/InvestorDetail";

export const Investor: FC = () => {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary onReset={reset} fallbackRender={fallbackRender}>
					<InvestorDetail />
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
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
