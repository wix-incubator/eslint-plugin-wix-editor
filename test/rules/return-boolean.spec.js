'use strict'

const rule = require('../../src/rules/return-boolean')
const {RuleTester} = require('eslint')

const ruleTester = new RuleTester()
const errorsObject = require('../util/errorsObject')

const trueFalse = 'this could be simplified to "return Boolean(b)"'
const falseTrue = 'this could be simplified to "return !Boolean(b)"'
const trueTrue = 'this could be simplified to "return true"'
const falseFalse = 'this could be simplified to "return false"'

ruleTester.run('return-boolean', rule, {
  valid: [
    'function f() { if (b) { return true } }',
    'function f() { if (b) return !!false; else return false }'
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
