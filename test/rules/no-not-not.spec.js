'use strict'

const rule = require('../../src/rules/no-not-not')
const {RuleTester} = require('eslint')

const ruleTester = new RuleTester()
const errorsObject = require('../util/errorsObject')

const castToBoolean = 'Cast to boolean with `Boolean()`'

ruleTester.run('no-not-not', rule, {
  valid: [
    '!x',
    '!~!x',
    '"!x"'
  ],
  invalid: [
    {code: '!!x', errors: errorsObject(castToBoolean)},
    {code: '!(!(x))', errors: errorsObject(castToBoolean)},
    {code: '!!func()', errors: errorsObject(castToBoolean)},
    {code: '!!arr.filter(function(){})', errors: errorsObject(castToBoolean)},
    {code: '!!!x', errors: errorsObject(castToBoolean)},
    {code: '!!!!x', errors: errorsObject(castToBoolean)}
  ]
})
