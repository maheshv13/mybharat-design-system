
import { writeFile } from "node:fs/promises";
import path from "node:path";

const generateConfig = async (config, projectDirectory) => {
  const filePath = path.join(
    projectDirectory,
    "mybharat.config.json"
  );

  const content = JSON.stringify(config, null, 2) + "\n";

  await writeFile(filePath, content, "utf-8");

  return filePath;
};

export default generateConfig;
