import pascalCaseToDash from "../utils/pascal-case-to-dash.js";

/**
 * Generator for styles.
 *
 * @param {string} componentName
 * @returns string
 */
export default (componentName) =>
  `@import '../../../styles/base.scss';

.${pascalCaseToDash(componentName)} {
    @include block(large);
}
`;
