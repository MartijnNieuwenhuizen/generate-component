module.exports = (withPrepare) => {
  const prepareInterface = withPrepare
    ? `import type { PreparedComponentInterface } from "./interface";`
    : ``;

  const prepareFunction = withPrepare
    ? `export const mockContentGeneratorWithPrepare =
(): PreparedComponentInterface => ({
    children: "<h1>This is a auto generated block</h1>",
});`
    : ``;

  return `import type ComponentInterface from "./interface";
${prepareInterface}

export default (): ComponentInterface => ({
  children: "<h1>This is a auto generated block</h1>",
});

${prepareFunction}
`;
};
