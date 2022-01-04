module.exports = (withPrepare) => {
  const prepareInterface = withPrepare
    ? `import type { PreparedComponentInterface } from "./interface";`
    : ``;

  const prepareFunction = withPrepare
    ? `export const generateMockContentWithPrepare = (
  overwrite: PartialPreparedComponentInterface = {}
): PreparedComponentInterface => 
  deepMerge<PreparedComponentInterface>(
    {
      children: "<h1>This is a auto generated block</h1>",
    },
    overwrite
  );`
    : ``;

  const partialPreparedInterface = withPrepare
    ? `type PartialPreparedComponentInterface = Subset<PreparedComponentInterface>;`
    : ``;

  return `import type ComponentInterface from "./interface";
${prepareInterface}
import type { Subset } from "../../../interfaces/subset";

import { deepMerge } from "../../../utils/deep-merge";

type PartialComponentInterface = Subset<ComponentInterface>;
${partialPreparedInterface}

export default (
  overwrite: PartialComponentInterface = {}
): ComponentInterface =>
  deepMerge<ComponentInterface>(
    {
      children: "<h1>This is a auto generated block</h1>",
    }, 
    overwrite
  );

${prepareFunction}
`;
};
