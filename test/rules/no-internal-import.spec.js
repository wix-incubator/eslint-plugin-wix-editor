'use strict'
const rule = require('../../src/rules/no-internal-import')
const {getRuleTester} = require('../util/ruleTester')
// const ruleTester = getRuleTester()
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2015, sourceType: 'module'}})
const errorsObject = require('../util/errorsObject')

ruleTester.run('no-instanceof-array', rule, {
  valid: [
    "import x from 'x'",
    "import {y} from 'x'"
  ],
  invalid: [{
    code: "import b from 'a/b'",
    errors: errorsObject('Reaching to "a/b" is not allowed.')
  }]
})
