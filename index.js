"use strict";

const fs = require("fs");
const cmsGenerator = require("./generators/cms");
const componentGenerator = require("./generators/component");
const interfaceGenerator = require("./generators/interface");
const stylesGenerator = require("./generators/styles");
const prepareGenerator = require("./generators/prepare");
const storyGenerator = require("./generators/story");

const writeFileErrorHandler = require("./utils/write-file-error-handler");
const startsWithCapital = require("./utils/starts-with-capital");

(function () {
  // Grab and filter flags from arguments.
  const argumentFlags = process.argv.filter((item) => item.includes("--"));
  const argumentsWithoutFlags = process.argv.filter(
    (item) => !item.includes("--")
  );

  const withPrepare = argumentFlags.includes("--with-prepare");
  const withNetlifyCMs = argumentFlags.includes("--with-netlify-cms");
  const withStory = argumentFlags.includes("--with-story");

  // Grab component-path and component-name from terminal argument.
  const [componentPath, componentName] = argumentsWithoutFlags.slice(2);
  const dir = `${componentPath}/${componentName}/`;

  // Throw error if component-name isn't provided.
  if (!componentName) throw new Error("You must include a component name.");

  // Throw error if the component name isn't in Pascal case
  if (!startsWithCapital(componentName))
    throw new Error("The component name must be PascalCase");

  // Throw an error if the file already exists.
  if (fs.existsSync(dir))
    throw new Error("A component with that name already exists.");

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

  // Generate cms.ts
  if (withNetlifyCMs) {
    fs.writeFile(
      `${dir}/cms.ts`,
      cmsGenerator(componentName),
      writeFileErrorHandler
    );
  }

  // Generate prepare.ts
  if (withPrepare) {
    fs.writeFile(
      `${dir}/prepare.ts`,
      prepareGenerator(),
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
})();
