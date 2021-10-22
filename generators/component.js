const pascalCaseToDash = require("../utils/pascal-case-to-dash");

/**
 * Generator for a component.
 *
 * @param {string} componentName
 * @param {boolean} withPrepare
 * @returns string
 */
module.exports = (componentName, withPrepare) =>
  withPrepare
    ? `import type ComponentInterface from './interface';
import type { PreparedComponentInterface } from './interface';

import withPrepare from "../../../utils/create-full-page-data/with-prepare";

import prepare from './prepare';
import styles from './styles.module.scss';

function ${componentName}({ children }: PreparedComponentInterface) {
    return (
        <div className={styles['${pascalCaseToDash(componentName)}']}>
            <h1>Hello! ${componentName}</h1>
            {children}
        </div>
    );
}

export default withPrepare<ComponentInterface, PreparedComponentInterface>(
    prepare
)(${componentName});
`
    : `import type ComponentInterface from './interface';

import styles from './styles.module.scss';

export default function ${componentName}({ children }: ComponentInterface) {
    return (
        <div className={styles['${pascalCaseToDash(componentName)}']}>
            <h1>Hello! ${componentName}</h1>
            {children}
        </div>
    );
}`;
