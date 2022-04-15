const capitalizeFirstLetter = require("../utils/capitalize-first-letter");
const toHumanReadableText = require("../utils/to-human-readable-text");

module.exports = (componentName, withPrepare) => {
  const generatorImport = withPrepare
    ? `import { generateMockContentWithPrepare } from "./generate-mock-content";`
    : `import generateMockContent from "./generate-mock-content";`;

  const interfaceImport = withPrepare
    ? `import type { PreparedComponentInterface } from "./interface";`
    : ``;

  const generatorFunctionName = withPrepare
    ? `generateMockContentWithPrepare`
    : `generateMockContent`;

  const storyName = capitalizeFirstLetter(toHumanReadableText(componentName));

  const componentCaller = withPrepare ? "Component.render" : "Component";

  const argument = withPrepare ? "args: PreparedComponentInterface" : "args";

  return `import { Meta, Story } from "@storybook/addon-docs";

${interfaceImport}

${generatorImport}

import Component from "./index";

<Meta title="Flexibles/${storyName}" component={${componentCaller}} />

export const Template = (${argument}) => <${componentCaller} {...args} />;

<Story name="${storyName}" args={${generatorFunctionName}()}>
    {Template.bind({})}
</Story>
`;
};
