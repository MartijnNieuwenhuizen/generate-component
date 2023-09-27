import fs from "fs";

import displayError from "./display-error.js";
import boldCliText from "./bold-cli-text.js";

export default function useSettings() {
  const isUndefined = (value) => value === undefined;
  const errorMessage = (property) =>
    `🚨 Property ${boldCliText(property)} is missing in the ${boldCliText(
      ".component-generator.js"
    )} file.`;

  // Load and parse the configuration file
  const fileName = ".componentgenerator.json";
  const settingsPath = `./${fileName}`;
  try {
    const settingsFileContent = fs.readFileSync(settingsPath, "utf8");
    const settings = JSON.parse(settingsFileContent);

    if (isUndefined(settings.codeStack))
      throw new Error(errorMessage("codeStack"));
    if (isUndefined(settings.withInitialData))
      throw new Error(errorMessage("withInitialData"));
    if (isUndefined(settings.flexiblesPath))
      throw new Error(errorMessage("flexiblesPath"));
    if (isUndefined(settings.modulesPath))
      throw new Error(errorMessage("modulesPath"));
    if (isUndefined(settings.partialsPath))
      throw new Error(errorMessage("partialsPath"));

    return settings;
  } catch (error) {
    return displayError(error.message);
  }
}
