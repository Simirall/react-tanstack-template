import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "../../auth";

export const Route = createFileRoute("/login/")({
  beforeLoad: ({ context }) => {
    if (context.getAuthState().isLogin) {
      throw redirect({ replace: true, to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { login } = useAuth();
  return (
    <button onClick={login} type="button">
      Login
    </button>
  );
}
