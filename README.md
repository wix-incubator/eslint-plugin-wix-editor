# ESLint-plugin-wix-editor

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dependency Status][dev-deps-image]][dev-deps-url]

Wix's editor group's custom ESLint rules


# Installation

Install [ESLint](https://www.github.com/eslint/eslint) and eslint-plugin-wix-editor into your project.

```sh
$ npm install --save-dev eslint eslint-plugin-wix-editor
```

# Configuration

Add `plugins` section and specify eslint-plugin-wix-editor as a plugin into your `.eslintrc`:

```json
{
  "plugins": ["wix-editor"]
}
```

Finally, enable all of the rules that you would like to use:

```json
{
  "rules": {
    "wix-editor/augmented-assignment": 2,
    "wix-editor/no-not-not": 2,
    "wix-editor/no-unneeded-match": 2,
    "wix-editor/prefer-filter": 2,
    "wix-editor/prefer-ternary": 2,
    "wix-editor/return-boolean": 2,
    "wix-editor/simplify-boolean-expression": 2
  }
}
```


# Rules

* [augmented-assignment](docs/augmented-assignment.md): Prevent code duplication that could be simplified to augmented assignment.
* [no-not-not](docs/no-not-not.md): Prevent casting to boolean with `!!`
* [no-unneeded-match](docs/no-unneeded-match.md): Prevent using `str.match(rgx)` as a boolean value.
* [prefer-filter](docs/prefer-filter.md): Prevent `forEach` statements that only include an `if` statement.
* [prefer-ternary](docs/prefer-ternary.md): Prevent use of `if-else` statements that only include assignment to the same variable.
* [return-boolean](docs/return-boolean.md): Prevent use of `if-else` for returning boolean values.
* [simplify-boolean-expression](docs/simplify-boolean-expression.md): Prevent use of function definition inside boolean expression.


# Contributions

Contributions in the form of issues and pull requests are welcome.

Before creating a pull request, please make sure that:
- Each of your commits is needed and makes sense. Squash/rebase as needed.
- Lint and tests pass. Check with `npm test`.
- Coverage percentage has not dropped.

To begin:

```bash
git clone git@github.com:wix/eslint-plugin-wix-editor.git
cd eslint-plugin-wix-editor
npm i
npm test
```


# License

eslint-plugin-wix-editor is licensed under the MIT License.


<!-- link labels -->
[npm-url]: https://npmjs.org/package/eslint-plugin-wix-editor
[npm-image]: http://img.shields.io/npm/v/eslint-plugin-wix-editor.svg

[travis-url]: https://travis-ci.org/wix/eslint-plugin-wix-editor
[travis-image]: http://img.shields.io/travis/wix/eslint-plugin-wix-editor/master.svg

[deps-url]: https://david-dm.org/wix/eslint-plugin-wix-editor
[deps-image]: https://david-dm.org/wix/eslint-plugin-wix-editor.svg

[dev-deps-url]: https://david-dm.org/wix/eslint-plugin-wix-editor#info=devDependencies
[dev-deps-image]: https://david-dm.org/wix/eslint-plugin-wix-editor/dev-status.svg
