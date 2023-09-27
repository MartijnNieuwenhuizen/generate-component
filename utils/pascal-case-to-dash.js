/**
 * TestModule to test-module
 *
 * @param {string} str
 * @returns string
 */
export default (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
