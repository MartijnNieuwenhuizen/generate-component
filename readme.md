# Generate Next.js component

A opinionated file generator for Next.js with TypeScript and CSS Modules.

It will generate 3 or 4 files:

- index.tsx - React component
- interface.ts - Component interface
- styles.module.scss - CSS Modules file with import statement
- prepare.ts [optional] - Prepare function, needed for GRRR
- storybook.ts [optional] - Storybook component
- cms.ts [optional] - Netlify CMS

The setup is based on [this article](https://levelup.gitconnected.com/how-to-generate-react-components-from-your-terminal-a27741a5b862).

## Setup

### Add script to package.json

`"create-component": "node node_modules/@martijnnieuwenhuizen/generate-component"`
`"cc": "node node_modules/@martijnnieuwenhuizen/generate-component"`

### Add config file

Filename: `.componentgenerator.json`

```json
{
  "codeStack": "wordpress-nextjs",
  "withInitialData": false,
  "flexiblesPath": "./components/flexibles",
  "modulesPath": "./components/modules",
  "partialsPath": "./components/partials"
}
```

Options:

- codeStack: "wordpress-nextjs" | "nova-nextjs" | "netlify-cms-nextjs"
- codeStack: true | false
- flexiblesPath: "./components/flexibles"
- modulesPath: "./components/modules"
- partialsPath: "./components/partials

## Usage

`yarn run create-component` or `yarn run cc`

## Generated files

These files will be generated:

### Component

```tsx
import type ComponentNameInterface from "./interface";

import styles from "./styles.module.scss";

export default function ComponentName({ children }: ComponentNameInterface) {
  return (
    <div className={styles["component-name"]}>
      <h1>Hello! ComponentName</h1>
      {children}
    </div>
  );
}
```

### Interface

```ts
export default interface ComponentName {
  children: React.ReactNode;
}
```

### Style

```scss
@import "../../../styles/base.scss";

.component-name {
  @include block(large);
}
```

### CMS

```ts
export default {
  label: "Component name",
  name: "component-name",
  widget: "object",
  summary: "Component name | {{fields.title}}",
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
      required: false,
    },
    {
      label: "Component",
      name: "component",
      widget: "hidden",
      default: "component-name",
    },
  ],
};
```
