import { expect, test } from "vitest";
import { page, userEvent } from "vitest/browser";
import { renderApp } from "./test-utils";

test("未ログインでトップへアクセスするとログイン画面へリダイレクトされる", async () => {
  renderApp({ route: "/" });

  await expect.poll(() => window.location.pathname).toBe("/login");

  await expect
    .element(page.getByRole("button", { name: "Login" }))
    .toBeInTheDocument();
});

test("ログイン画面で操作するとホーム画面へ遷移する", async () => {
  renderApp({ route: "/login" });

  await expect
    .element(page.getByRole("button", { name: "Login" }))
    .toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "Login" }));

  await expect.poll(() => window.location.pathname).toBe("/");
  await expect
    .element(page.getByRole("link", { name: "Home" }))
    .toBeInTheDocument();
  await expect
    .element(page.getByRole("button", { name: "Logout" }))
    .toBeInTheDocument();
});

test("ログイン済みでログイン画面へアクセスするとホーム画面へ戻る", async () => {
  renderApp({ authState: { isLogin: true }, route: "/login" });

  await expect.poll(() => window.location.pathname).toBe("/");
  await expect
    .element(page.getByRole("link", { name: "Home" }))
    .toBeInTheDocument();
  await expect
    .element(page.getByRole("button", { name: "Logout" }))
    .toBeInTheDocument();
});

test("ホーム画面でログアウトするとログイン画面へ戻る", async () => {
  renderApp({ authState: { isLogin: true }, route: "/" });

  await expect.poll(() => window.location.pathname).toBe("/");
  await expect
    .element(page.getByRole("button", { name: "Logout" }))
    .toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "Logout" }));

  await expect.poll(() => window.location.pathname).toBe("/login");
  await expect
    .element(page.getByRole("button", { name: "Login" }))
    .toBeInTheDocument();
});
