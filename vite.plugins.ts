import babel from "@rolldown/plugin-babel";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import type { PluginOption } from "vite";

export const appPlugins = (): PluginOption[] => [
  tanstackRouter({
    autoCodeSplitting: true,
    target: "react",
  }),
  react(),
  babel({ presets: [reactCompilerPreset()] }),
];
