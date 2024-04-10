import {
	QueryClient,
	QueryClientProvider,
	QueryErrorResetBoundary,
} from "@tanstack/react-query";
import {
	RouterProvider,
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Investor } from "./pages/Investor";
import { Root } from "./pages/Root";

export const BASE_API = "http://localhost:8000/api";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Root,
});

const investorRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/investors/$investorId",
	component: Investor,
});

const routeTree = rootRoute.addChildren([indexRoute, investorRoute]);

const router = createRouter({ routeTree });

const container = document.getElementById("root");
// biome-ignore lint/style/noNonNullAssertion:
const root = createRoot(container!);
root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
);
