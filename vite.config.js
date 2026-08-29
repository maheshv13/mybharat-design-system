/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = import.meta.dirname;
import dts from "vite-plugin-dts";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      include: ["src"],
      outDir: "dist",
      exclude: [
        "src/**/*.stories.*",
        "src/**/*.test.*",
        "src/stories",
        "src/vite.config.js"
      ],
      rollupTypes: false
    })
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "MyBharatDesignSystem",
      formats: ["es", "cjs"],
      cssFileName: "design-system",
      fileName: (format) => {
        if (format === "es") {
          return "mybharat-design-system.es.js";
        }
        return "mybharat-design-system.cjs";
      }
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"]
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});