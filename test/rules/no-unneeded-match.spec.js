'use strict'

const rule = require('../../src/rules/no-unneeded-match')
const {RuleTester} = require('eslint')

const ruleTester = new RuleTester()
const errorsObject = require('../util/errorsObject')

const useTest = 'Use `Regex.test() instead`'

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
