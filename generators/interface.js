/**
 * Generator for a interface.
 
 * @param {boolean} withPrepare
 * @returns string
 */
module.exports = (withPrepare) => {
  const prepareInterface = withPrepare
    ? `export interface PreparedComponentInterface extends ComponentInterface {}`
    : "";

  return `export default interface ComponentInterface {
  children: React.ReactNode;
}

${prepareInterface}
`;
};
