import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { RouterContext } from "../App";
import { Header } from "./-components/Header";

const RootLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
