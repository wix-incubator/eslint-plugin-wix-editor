'use strict'
const rule = require('../../src/rules/no-internal-import')
// const {getRuleTester} = require('../util/ruleTester')
// const ruleTester = getRuleTester()
const {RuleTester} = require('eslint')
const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {ecmaVersion: 2015, sourceType: 'module'}
})
// "parser": "@typescript-eslint/parser",
//   "plugins": [
//   "@typescript-eslint"
// ],
//   "parserOptions": {
//   "ecmaFeatures": {
//     "jsx": true
//   },
//   "useJSXTextNode": true,
//     "project": "./tsconfig.json",
//     "tsconfigRootDir": "."
// },
const errorsObject = require('../util/errorsObject')

ruleTester.run('no-internal-import', rule, {
  valid: [
    "import type {T} from 'x/b/types'"
  ],
  invalid: [
    {
      code: 'import b from \'a/b\'',
      errors: errorsObject('Reaching to "a/b" is not allowed.'),
    }, {
      code: 'const b = require(\'a/b\')',
      errors: errorsObject('Reaching to "a/b" is not allowed.')
    }
  ]
})
