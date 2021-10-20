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

  return `import { ComponentStory } from "@storybook/react";
  
${generatorImport}
import Component from "./index";

export default {
  title: "Flexible/${storyName}",
  component: Component,
};

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const ${componentName} = Template.bind({});
${componentName}.args = ${generatorFunctionName}();
`;
};
