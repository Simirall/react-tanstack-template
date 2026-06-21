import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Provider as JotaiProvider } from "jotai";
import { useLayoutEffect } from "react";
import {
  type AuthState,
  authStore,
  getAuthState,
  subscribeAuthState,
} from "./auth";
import { routeTree } from "./routeTree.gen.ts";

const queryClient = new QueryClient();

export type RouterContext = {
  queryClient: QueryClient;
  getAuthState: () => AuthState;
};

const router = createRouter({
  context: {
    getAuthState: undefined!,
    queryClient: queryClient,
  } satisfies RouterContext,
  defaultPreload: "intent",
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  useLayoutEffect(() => {
    return subscribeAuthState(() => {
      void router.invalidate();
    });
  }, []);

  return (
    <JotaiProvider store={authStore}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider context={{ getAuthState }} router={router} />
      </QueryClientProvider>
    </JotaiProvider>
  );
}
