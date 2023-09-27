import capitalizeFirstLetter from "../utils/capitalize-first-letter.js";
import pascalCaseToDash from "../utils/pascal-case-to-dash.js";
import toHumanReadableText from "../utils/to-human-readable-text.js";

/**
 * Generator for a cms.
 *
 * @param {string} componentName
 * @returns string
 */
export default (componentName) =>
  `import type NetlifyCmsField from '../../../interfaces/NetlifyCmsField';

  export default <NetlifyCmsField>{
    label: '${capitalizeFirstLetter(toHumanReadableText(componentName))}',
    name: '${pascalCaseToDash(componentName)}',
    widget: 'object',
    summary: '${capitalizeFirstLetter(
      toHumanReadableText(componentName)
    )} | {{fields.title}}',
    fields: [
        {
            label: 'Title',
            name: 'title',
            widget: 'string',
            required: false,
        },
        {
            label: 'Component',
            name: 'component',
            widget: 'hidden',
            default: '${pascalCaseToDash(componentName)}',
        },
    ],
};
`;
