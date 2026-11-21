
import { access, readFile } from "node:fs/promises";
import path from "node:path";

import { confirm } from "@inquirer/prompts";

import themePrompt from "../prompts/themePrompt.js";
import generateConfig from "../generators/configGenerator.js";
import generateTheme from "../generators/themeGenerator.js";
import detectFramework from "../utils/detectFramework.js";

const fileExists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
};


const readExistingConfig = async (filePath) => {
  try {
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }

    if (error instanceof SyntaxError) {
      throw new Error(
        "mybharat.config.json contains invalid JSON. Please fix it before continuing.",
        { cause: error }
      );
    }

    throw error;
  }
};


const init = async () => {
  const projectDirectory = process.cwd();

  const configPath = path.join(
    projectDirectory,
    "mybharat.config.json"
  );

  const themePath = path.join(
    projectDirectory,
    "mybharat-theme.css"
  );

  const configExists = await fileExists(configPath);
  const themeExists = await fileExists(themePath);

  let existingConfig = {};

  if (configExists || themeExists) {
    console.log("\nExisting MY Bharat theme files detected.");

    const shouldUpdate = await confirm({
      message: "Do you want to update your existing theme?",
      default: false,
    });

    if (!shouldUpdate) {
      console.log(
        "\nExisting theme files were preserved. No changes made."
      );
      return;
    }

    existingConfig = await readExistingConfig(configPath);
  }

  const config = await themePrompt(existingConfig);

  console.log("\nGenerating theme files...\n");

  const generatedConfig = await generateConfig(
    config,
    projectDirectory
  );

  const generatedTheme = await generateTheme(
    config,
    projectDirectory
  );

  const frameworkInfo = await detectFramework(projectDirectory);

  console.log("\n========================================");
  console.log("       Theme Setup Completed!");
  console.log("========================================\n");

  console.log("Detected framework:", frameworkInfo.framework);

  console.log("\nGenerated files:");
  console.log(`✔ ${path.basename(generatedConfig)}`);
  console.log(`✔ ${path.basename(generatedTheme)}`);

  console.log("\nTheme configuration:");
  console.log(JSON.stringify(config, null, 2));

  console.log("\nCSS Integration Instructions:");
  console.log(frameworkInfo.instructions);

  console.log("\n========================================\n");
};

export default init;
