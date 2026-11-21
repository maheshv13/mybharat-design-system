
import { readFile } from "node:fs/promises";
import path from "node:path";

const detectFramework = async (projectDirectory) => {
  const packagePath = path.join(projectDirectory, "package.json");

  let packageJson;

  try {
    const content = await readFile(packagePath, "utf-8");
    packageJson = JSON.parse(content);
  } catch {
    return {
      framework: "unknown",
      instructions: "Could not detect the project framework.",
    };
  }

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const hasNext = Boolean(dependencies.next);
  const hasVite = Boolean(dependencies.vite);

  if (hasNext) {
    return {
      framework: "next",
      instructions:
        "Import the design-system CSS and mybharat-theme.css in app/layout.js or app/layout.tsx.",
    };
  }

  if (hasVite) {
    return {
      framework: "vite",
      instructions:
        "Import the design-system CSS and mybharat-theme.css in src/main.jsx or src/main.tsx.",
    };
  }

  if (dependencies.react) {
    return {
      framework: "react",
      instructions:
        "Import the design-system CSS and mybharat-theme.css in your application's entry file.",
    };
  }

  return {
    framework: "unknown",
    instructions:
      "Import both CSS files in your application's global stylesheet entry point.",
  };
};

export default detectFramework;
