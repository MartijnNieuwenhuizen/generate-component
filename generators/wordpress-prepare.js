/**
 * Generate a empty prepare function.
 *
 * @returns string
 */
module.exports = () =>
  `import type ComponentInterface from "./interface";
import type { PreparedComponentInterface } from "./interface";
import type { WPPost } from "../../../content/api-interfaces";

export default async function prepare(
    props: ComponentInterface,
    page: WPPost
): Promise<PreparedComponentInterface> {
    return {
        ...props,
    };
}
`;
