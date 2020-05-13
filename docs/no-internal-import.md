# No internal import

This rule aim to prevent importing package internals and allow only declare public entry point


## Rule Details

This rule has one option, allow which is an array of minimatch/glob patterns that whitelist 
paths and import statements that can be imported with reaching.

The following patterns are considered problems:

```js
import a from 'another-package/src/internal-module'
```

The following patterns are not considered problems:

```js
import a from 'another-package'
import a from './a'
import a from '../a'
```


## Version
This rule was introduced in eslint-plugin-wix-editor 3.1.0.
