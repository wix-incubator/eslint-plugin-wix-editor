'use strict'

var rule = require('../../src/rules/no-instanceof-array')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()
var errorsObject = require('../util/errorsObject')

ruleTester.run('no-instanceof-array', rule, {
  valid: [
    'Array.isArray(a)',
    'a instanceof SomeClass'
  ],
  invalid: [{
    code: 'a instanceof Array',
    errors: errorsObject('Use `Array.isArray(a)` instead of `a instanceof Array`')
  }]
})
