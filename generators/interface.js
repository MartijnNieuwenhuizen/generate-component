/**
 * Generator for a interface.
 *
 * @param {string} componentName
 * @returns string
 */
module.exports = componentName =>
  `export default interface ${componentName} {
    children: React.ReactNode;
}
`
