#!/usr/bin/env node

import { Command } from "commander";
import { readFile } from "node:fs/promises";

const program = new Command();

// Read the package version automatically
const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf-8")
);

program
  .name("mybharat-design-system")
  .description("MY Bharat Design System CLI")
  .version(packageJson.version);

program
  .command("init")
  .description("Initialize MY Bharat Design System")
  .action(async () => {
    try {
      const { default: init } = await import("./commands/init.js");

      await init();
    } catch (error) {
      if (error.name === "ExitPromptError") {
        console.log("\nSetup cancelled.");
        return;
      }

      console.error("\nSetup failed:", error.message);
      process.exitCode = 1;
    }
  });

await program.parseAsync(process.argv);
