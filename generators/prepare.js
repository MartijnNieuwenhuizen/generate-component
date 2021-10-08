const pascalCaseToDash = require("../utils/pascal-case-to-dash");

/**
 * Generate a empty prepare function.
 *
 * @returns string
 */
module.exports = () =>
  `import type ComponentInterface from "./interface";
import type { AllData } from "../../../utils/create-full-page-data";
  
export default function prepare(allData: AllData, props: ComponentInterface) {
    return {};
}
`;
