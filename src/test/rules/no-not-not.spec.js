'use strict'

var rule = require('../../main/rules/no-not-not')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()
var errorsObject = require('../util/errorsObject')

var castToBoolean = 'Cast to boolean with `Boolean()`'

ruleTester.run('no-not-not', rule, {
  valid: [
        {code: '!x'},
        {code: '!~!x'},
        {code: '"!x"'}
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
