import { expect, test } from "vitest";
import { page } from "vitest/browser";
import { renderApp } from "./test-utils";

test("ブラウザーモードでログイン画面を表示できる", async () => {
  renderApp({ route: "/login" });

  await expect
    .element(page.getByRole("button", { name: "Login" }))
    .toBeInTheDocument();
});
