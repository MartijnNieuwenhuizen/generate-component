'use strict'

const fs = require('fs')
const cms = require('./generators/cms')
const component = require('./generators/component')
const interface = require('./generators/interface')
const styles = require('./generators/styles')
const writeFileErrorHandler = require('./utils/write-file-error-handler')

// Grab and filter flags from arguments.
const argumentFlags = process.argv.filter(item => item.includes('--'))
const argumentsWithoutFlags = process.argv.filter(item => !item.includes('--'))

// Grab component-path and component-name from terminal argument.
const [componentPath, componentName] = argumentsWithoutFlags.slice(2)
if (!componentName) throw new Error('You must include a component name.')

const dir = `${componentPath}/${componentName}/`

// throw an error if the file already exists.
if (fs.existsSync(dir))
  throw new Error('A component with that name already exists.')

// create the folder
fs.mkdirSync(dir)

// Generate component.tsx
fs.writeFile(
  `${dir}/index.tsx`,
  component(componentName),
  writeFileErrorHandler
)
// Generate interface.ts
fs.writeFile(
  `${dir}/interface.ts`,
  interface(componentName),
  writeFileErrorHandler
)
// Generate component.scss
fs.writeFile(
  `${dir}/styles.module.scss`,
  styles(componentName),
  writeFileErrorHandler
)

if (argumentFlags.includes('--with-netlify-cms')) {
  // Generate cms.ts
  fs.writeFile(`${dir}/cms.ts`, cms(componentName), writeFileErrorHandler)
}
