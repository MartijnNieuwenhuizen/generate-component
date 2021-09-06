/**
 * TestModule to test module
 *
 * @param {string} str
 * @returns string
 */
module.exports = (str) => str.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
