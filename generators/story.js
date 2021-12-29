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

  return `import { ComponentStory } from "@storybook/react";
  
${generatorImport}
import Component from "./index";

export default {
  title: "Flexibles/${storyName}",
  component: Component,
};

const Template: ComponentStory<typeof ${componentCaller}> = (args) => (
  <${componentCaller} {...args} />
);

export const ${componentName} = Template.bind({});
${componentName}.args = ${generatorFunctionName}();
`;
};
