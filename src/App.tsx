import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";

const queryClient = new QueryClient();

export type RouterContext = { queryClient: QueryClient };

const router = createRouter({
  context: {
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
