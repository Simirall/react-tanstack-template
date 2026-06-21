import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getAuthState } from "../../auth";
import {
  AuthStoreProvider,
  resetAuthState,
} from "../../test-utils/auth-test-utils";
import { Header } from "./Header";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("ヘッダー", () => {
  beforeEach(() => {
    resetAuthState();
  });

  test("未ログイン時はナビゲーション操作を表示しない", () => {
    render(<Header />, {
      wrapper: AuthStoreProvider,
    });

    expect(
      screen.queryByRole("link", { name: "Home" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Logout" }),
    ).not.toBeInTheDocument();
  });

  test("ログイン時は操作を表示し、クリックでログアウトできる", () => {
    resetAuthState({ isLogin: true });

    render(<Header />, {
      wrapper: AuthStoreProvider,
    });

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    fireEvent.click(logoutButton);

    expect(getAuthState()).toEqual({ isLogin: false });
    expect(
      screen.queryByRole("link", { name: "Home" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Logout" }),
    ).not.toBeInTheDocument();
  });
});
