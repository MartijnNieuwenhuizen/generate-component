const capitalizeFirstLetter = require("../utils/capitalize-first-letter");
const toHumanReadableText = require("../utils/to-human-readable-text");

module.exports = (componentName, withPrepare) => {
  const interfaceImport = withPrepare
    ? `import type { PreparedComponentInterface } from "./interface";`
    : `import type ComponentInterface from "./interface";`;

  const interface = withPrepare
    ? `PreparedComponentInterface`
    : `ComponentInterface`;

  const storyName = capitalizeFirstLetter(toHumanReadableText(componentName));

  return `import { ComponentStory } from "@storybook/react";
    
    ${interfaceImport}
    
    import Component from "./index";
    
    export default {
        title: "Flexible/${storyName}",
        component: Component,
    };
    
    const Template: ComponentStory<typeof Component> = (args) => (
        <Component {...args} />
        );
        
        const defaultProps: ${interface} = {
            children: "<h1>Luke, I'm your child</h1>",
        };
        
        export const Text = Template.bind({});
        Text.args = defaultProps;
        `;
};
