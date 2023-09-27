/**
 * Generate a empty prepare function.
 *
 * @returns string
 */
export default (withoutInitialData) =>
  withoutInitialData
    ? `import type ComponentInterface from "./interface";
import type { PreparedComponentInterface } from "./interface";
import type { JsonApiObject } from "../../../content/api-interfaces";
  
export default async function prepare(
  props: ComponentInterface,
  pageData: JsonApiObject,
): Promise<PreparedComponentInterface> {
    return {
      ...props
    };
}`
    : `import type ComponentInterface from "./interface";
import type { PreparedComponentInterface } from "./interface";
import type { AllData } from "../../../utils/create-full-page-data";
  
export default function prepare(
  allData: AllData, 
  props: ComponentInterface
): PreparedComponentInterface {
    return {
      ...props
    };
}
`;
