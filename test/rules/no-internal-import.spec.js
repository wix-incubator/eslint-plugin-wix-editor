'use strict'
const rule = require('../../src/rules/no-internal-import')
// const {getRuleTester} = require('../util/ruleTester')
// const ruleTester = getRuleTester()
const {RuleTester} = require('eslint')
const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2015, sourceType: 'module'}})
const errorsObject = require('../util/errorsObject')

ruleTester.run('no-internal-import', rule, {
  valid: [
    "import x from 'x'",
    "const x = require('x')",
    "import {y} from 'x'",
    {
      code: "import b from 'a/b'",
      options: [{allow: ['a/b']}]
    },
    {
      code: "import b from 'a/b'",
      options: [{allow: ['a/*']}]
    },
    {
      code: 'bolt-ds-adapter/test/ds-adapter-testkit',
      options: [{allow: ['bolt-ds-adapter/test/ds-adapter-testkit']}]
    },
    {
      code: 'bolt-ds-adapter/test/ds-adapter-testkit',
      options: [{allow: ['bolt-ds-adapter/**']}]
    }
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
