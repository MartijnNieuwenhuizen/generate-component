const capitalizeFirstLetter = require("../utils/capitalize-first-letter");
const toHumanReadableText = require("../utils/to-human-readable-text");

module.exports = (componentName, withPrepare) => {
  const generatorImport = withPrepare
    ? `import { mockContentGeneratorWithPrepare } from "./mock-content-generator";`
    : `import mockContentGenerator from "./mock-content-generator";`;

  const generatorFunctionName = withPrepare
    ? mockContentGeneratorWithPrepare
    : mockContentGenerator;

  const storyName = capitalizeFirstLetter(toHumanReadableText(componentName));

  `import { ComponentStory } from "@storybook/react";
  
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
