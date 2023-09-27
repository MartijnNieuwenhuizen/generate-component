"use strict";
// Third party
import fs from "fs";

// Generators
import cmsGenerator from "../generators/cms.js";
import componentGenerator from "../generators/component.js";
import interfaceGenerator from "../generators/interface.js";
import stylesGenerator from "../generators/styles.js";
import prepareGenerator from "../generators/prepare.js";
import wordpressNextJSPrepareGenerator from "../generators/wordpress-nextjs-prepare.js";
import storyGenerator from "../generators/story.js";
import mockContentGenerator from "../generators/mock-content.js";

// Utils
import writeFileErrorHandler from "./write-file-error-handler.js";
import startsWithCapital from "./starts-with-capital.js";

// Constants
import {
  FLEXIBLE,
  MODULE,
  PARTIAL,
  MOCKED_CONTENT,
  PREPARE_FUNCTION,
  STORYBOOK,
} from "./constants.js";

export default (settings) =>
  (componentType, componentName, options = []) => {
    return new Promise((resolve, reject) => {
      // CMS
      const withNetlifyCms = settings.codeStack === "netlify-cms-nextjs";
      const withWordpressNextJS = settings.codeStack === "wordpress-nextjs";

      // Settings
      const prepareWithoutInitialData = !settings.withInitialData; // @TODO: Check if this is still needed!

      // Options
      const withStory = options.includes(STORYBOOK);
      const withPrepare = options.includes(PREPARE_FUNCTION);
      const withMockContentGenerator = options.includes(MOCKED_CONTENT);

      // Grab component-path and component-name from terminal argument.
      const getComponentPath = () => {
        if (componentType === FLEXIBLE) return settings.flexiblesPath;
        if (componentType === MODULE) return settings.modulesPath;
        if (componentType === PARTIAL) return settings.partialsPath;
      };

      const dir = `${getComponentPath()}/${componentName}/`;

      // Throw error if component-name isn't provided.
      if (!componentName)
        return reject(`❗️You must include a component name
`);

      // Throw error if the component name isn't in Pascal case
      if (!startsWithCapital(componentName))
        return reject(`❗️The component name must be PascalCase
`);

      // Throw an error if the file already exists.
      if (fs.existsSync(dir))
        return reject(`❗️A component with that name already exists
`);

      // create the folder
      fs.mkdirSync(dir);

      // Generate component.tsx
      fs.writeFile(
        `${dir}/index.tsx`,
        componentGenerator(componentName, withPrepare),
        writeFileErrorHandler
      );
      // Generate interface.ts
      fs.writeFile(
        `${dir}/interface.ts`,
        interfaceGenerator(withPrepare),
        writeFileErrorHandler
      );
      // Generate component.scss
      fs.writeFile(
        `${dir}/styles.module.scss`,
        stylesGenerator(componentName),
        writeFileErrorHandler
      );

      // Generate generate-mock-content.ts
      if (withMockContentGenerator) {
        fs.writeFile(
          `${dir}/generate-mock-content.ts`,
          mockContentGenerator(withPrepare),
          writeFileErrorHandler
        );
      }

      // Generate cms.ts
      if (withNetlifyCms) {
        fs.writeFile(
          `${dir}/cms.ts`,
          cmsGenerator(componentName),
          writeFileErrorHandler
        );
      }

      // Generate prepare.ts
      if (withPrepare && !withWordpressNextJS) {
        fs.writeFile(
          `${dir}/prepare.ts`,
          prepareGenerator(prepareWithoutInitialData),
          writeFileErrorHandler
        );
      }
      if (withPrepare && withWordpressNextJS) {
        fs.writeFile(
          `${dir}/prepare.ts`,
          wordpressNextJSPrepareGenerator(),
          writeFileErrorHandler
        );
      }

      // Generate index.story.tsx
      if (withStory) {
        fs.writeFile(
          `${dir}/index.story.tsx`,
          storyGenerator(componentName, withPrepare),
          writeFileErrorHandler
        );
      }

      return resolve({ componentType, componentName });
    });
  };
