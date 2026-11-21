
import { input, select } from "@inquirer/prompts";
import { validateColor } from "../utils/validateColor.js";

const CONTAINER_WIDTHS = [
  { name: "960px - Small", value: "960px" },
  { name: "1140px - Medium", value: "1140px" },
  { name: "1200px - Large", value: "1200px" },
  { name: "1320px - Extra Large", value: "1320px" },
];

const themePrompt = async (existingConfig = {}) => {
  console.log("\n========================================");
  console.log("     MY Bharat Design System Setup");
  console.log("========================================\n");

  const primary = await input({
    message: "Enter your Primary Color:",
    default: existingConfig.theme?.primary || "#BC4717",
    validate: validateColor,
  });

  const secondary = await input({
    message: "Enter your Secondary Color:",
    default: existingConfig.theme?.secondary || "#2563EB",
    validate: validateColor,
  });

  const existingWidth = existingConfig.container?.width;

  const containerWidth = await select({
    message: "Select Container Width:",
    choices: CONTAINER_WIDTHS,
    default: CONTAINER_WIDTHS.some(
      (item) => item.value === existingWidth
    )
      ? existingWidth
      : "1200px",
  });

  return {
    theme: {
      primary: primary.trim(),
      secondary: secondary.trim(),
    },
    container: {
      width: containerWidth,
    },
  };
};

export default themePrompt;
