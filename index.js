"use strict";

import inquirer from "inquirer";

import displayError from "./utils/display-error.js";
import generateComponentFactory from "./utils/generate-component.js";
import boldCliText from "./utils/bold-cli-text.js";
import useSettings from "./utils/use-settings.js";

import {
  FLEXIBLE,
  MODULE,
  PARTIAL,
  PREPARE_FUNCTION,
  MOCKED_CONTENT,
  STORYBOOK,
  TYPE_OF_COMPONENT,
  OPTIONS,
  COMPONENT_NAME,
} from "./utils/constants.js";

(function () {
  const {
    codeStack,
    withInitialData,
    flexiblesPath,
    modulesPath,
    partialsPath,
  } = useSettings();

  const generateComponent = generateComponentFactory({
    codeStack,
    withInitialData,
    flexiblesPath,
    modulesPath,
    partialsPath,
  });

  const componentOptions = [
    { name: FLEXIBLE },
    { name: MODULE },
    { name: PARTIAL },
  ];
  const flexibleOptions = [
    { name: PREPARE_FUNCTION },
    { name: MOCKED_CONTENT },
    { name: STORYBOOK },
  ];

  inquirer
    .prompt([
      {
        type: "name",
        message: "🚀 What's the name of your component?",
        name: "component_name",
      },
      {
        type: "list",
        message: "🤸‍♂️ Select type of component",
        name: TYPE_OF_COMPONENT,
        choices: componentOptions,
      },
    ])
    .then((data) => {
      const typeOfComponent = data[TYPE_OF_COMPONENT];

      if (typeOfComponent === "Flexible") {
        return inquirer
          .prompt([
            {
              type: "checkbox",
              message: "✨ Select options",
              name: OPTIONS,
              choices: flexibleOptions,
            },
          ])
          .then((secondaryData) => {
            return {
              typeOfComponent,
              componentName: data[COMPONENT_NAME],
              options: secondaryData[OPTIONS],
            };
          })
          .catch(displayError);
      } else {
        return {
          typeOfComponent,
          componentName: data[COMPONENT_NAME],
          options: [],
        };
      }
    })
    .then((lastData) => {
      const { typeOfComponent, componentName, options } = lastData;
      return generateComponent(typeOfComponent, componentName, options);
    })
    .then(({ componentType, componentName }) =>
      console.log(`
🔥 Whoop Whoop! 🚀 The ${boldCliText(componentType)} called ${boldCliText(
        componentName
      )} is generated successfully!
`)
    )
    .catch(displayError);
})();
