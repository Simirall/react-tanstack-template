import { defineConfig } from "vite";
import { appPlugins } from "./vite.plugins";

// https://vite.dev/config/
export default defineConfig({
  plugins: appPlugins(),
});
