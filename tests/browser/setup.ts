import { afterEach, beforeEach } from "vitest";
import { userEvent } from "vitest/browser";
import { cleanupRenderedApp, resetBrowserTestState } from "./test-utils";

beforeEach(() => {
  resetBrowserTestState();
});

afterEach(async () => {
  await userEvent.cleanup();
  cleanupRenderedApp();
});
