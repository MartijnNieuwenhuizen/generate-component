const pascalCaseToDash = require('../utils/pascal-case-to-dash')

/**
 * Generator for a component.
 *
 * @param {string} componentName
 * @returns string
 */
module.exports = componentName =>
  `import type ${componentName}Interface from './interface';

import styles from './styles.module.scss';

export default function ${componentName}({ children }: ${componentName}Interface) {
    return (
        <div className={styles['${pascalCaseToDash(componentName)}']}>
            <h1>Hello! ${componentName}</h1>
            {children}
        </div>
    );
}`
