const pascalCaseToDash = require("../utils/pascal-case-to-dash");

/**
 * Generator for styles.
 *
 * @param {string} componentName
 * @returns string
 */
module.exports = (componentName) =>
  `@import '../../../styles/base.scss';

.${pascalCaseToDash(componentName)} {
    @include block(large);
}
`;
