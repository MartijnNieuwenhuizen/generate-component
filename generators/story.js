const capitalizeFirstLetter = require("../utils/capitalize-first-letter");
const toHumanReadableText = require("../utils/to-human-readable-text");

module.exports = (componentName, withPrepare) => {
  const generatorImport = withPrepare
    ? `import { generateMockContentWithPrepare } from "./generate-mock-content";`
    : `import generateMockContent from "./generate-mock-content";`;

  const generatorFunctionName = withPrepare
    ? `generateMockContentWithPrepare`
    : `generateMockContent`;

  const storyName = capitalizeFirstLetter(toHumanReadableText(componentName));

  const componentCaller = withPrepare ? "Component.render" : "Component";

  return `import { Meta, Story } from "@storybook/addon-docs";

${generatorImport}

import Component from "./index";

<Meta title="Flexibles/${storyName}" component={${componentCaller}} />

export const Template = (args) => <${componentCaller} {...args} />;

<Story name="${storyName}" args={${generatorFunctionName}()}>
    {Template.bind({})}
</Story>
`;
};
