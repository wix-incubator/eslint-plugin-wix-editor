'use strict'

var rule = require('../../main/rules/return-boolean')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()
var errorsObject = require('../util/errorsObject')

var trueFalse = 'this could be simplified to "return Boolean(b)"'
var falseTrue = 'this could be simplified to "return !Boolean(b)"'
var trueTrue = 'this could be simplified to "return true"'
var falseFalse = 'this could be simplified to "return false"'

ruleTester.run('return-boolean', rule, {
  valid: [
        {code: 'function f() { if (b) { return true } }'},
        {code: 'function f() { if (b) return !!false; else return false }'}
  ],
  invalid: [
        {code: 'function f() { if (b) return true; else return false }', errors: errorsObject(trueFalse)},
        {code: 'function f() { if (b) return true; else return false; }', errors: errorsObject(trueFalse)},
        {code: 'function f() { if (b) {return true} else {return false} }', errors: errorsObject(trueFalse)},
        {code: 'function f() { if (b) return false; else return true }', errors: errorsObject(falseTrue)},
        {code: 'function f() { if (b) {return false} else {return true} }', errors: errorsObject(falseTrue)},
        {code: 'function f() { if (b) return true; else return true; }', errors: errorsObject(trueTrue)},
        {code: 'function f() { if (b) return false; else return false }', errors: errorsObject(falseFalse)}
  ]
})
