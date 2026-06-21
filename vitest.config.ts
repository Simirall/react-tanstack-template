import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";
import { appPlugins } from "./vite.plugins";

export default defineConfig({
  plugins: appPlugins(),
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
    projects: [
      {
        extends: true,
        test: {
          environment: "happy-dom",
          include: [
            "src/**/*.test.ts",
            "src/**/*.test.tsx",
            "src/**/*.spec.ts",
            "src/**/*.spec.tsx",
          ],
          name: "unit",
          setupFiles: ["./src/test-utils/setup.ts"],
        },
      },
      {
        extends: true,
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: "chromium" }],
            provider: playwright(),
          },
          include: [
            "tests/browser/**/*.test.ts",
            "tests/browser/**/*.test.tsx",
            "tests/browser/**/*.spec.ts",
            "tests/browser/**/*.spec.tsx",
          ],
          name: "browser",
          setupFiles: ["./tests/browser/setup.ts"],
        },
      },
    ],
    reporters: ["default"],
  },
});
