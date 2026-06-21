import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (!context.getAuthState().isLogin) {
      throw redirect({ replace: true, to: "/login" });
    }
  },
});
