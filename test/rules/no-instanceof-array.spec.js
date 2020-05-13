'use strict'
const rule = require('../../src/rules/no-instanceof-array')
const {RuleTester} = require('eslint')
const ruleTester = new RuleTester()
const errorsObject = require('../util/errorsObject')

ruleTester.run('no-instanceof-array', rule, {
  valid: [
    'Array.isArray(a)',
    'a instanceof SomeClass'
  ],
  invalid: [{
    code: 'a instanceof Array',
    errors: errorsObject("Use 'Array.isArray(a)' instead of 'a instanceof Array'")
  }]
})
