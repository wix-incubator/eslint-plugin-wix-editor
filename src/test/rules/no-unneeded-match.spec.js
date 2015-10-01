'use strict'

var rule = require('../../main/rules/no-unneeded-match')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()
var errorsObject = require('../util/errorsObject')

var useTest = 'Use `Regex.test() instead`'

ruleTester.run('no-unneeded-match', rule, {
  valid: [
    '"".match(/a/)',
    'var m = "".match(/a/)'
  ],
  invalid: [
    {code: 'if ("".match(/a/)) {}', errors: errorsObject(useTest)},
    {code: 'while ("".match(/a/)) {}', errors: errorsObject(useTest)},
    {code: 'for (;"".match(/a/);) {}', errors: errorsObject(useTest)},
    {code: '"".match(/a/) ? a : b', errors: errorsObject(useTest)},
    {code: '!("".match(/a/))', errors: errorsObject(useTest)},
    {code: '!!("".match(/a/))', errors: errorsObject(useTest)},
    {code: 'Boolean("".match(/a/))', errors: errorsObject(useTest)}
  ]
})
