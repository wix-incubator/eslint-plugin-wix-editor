'use strict'

const rule = require('../../src/rules/simplify-boolean-expression')
const {RuleTester} = require('eslint')

const ruleTester = new RuleTester()
const errorsObject = require('../util/errorsObject')

const useTest = 'Define function outside boolean expression'

ruleTester.run('no-condition-callback', rule, {
  valid: [
    'if (func()) {}',
    'function func() {}',
    'if (x) { (function f() {}).call(null)}'
  ],
  invalid: [
    {code: 'if    (f(function () {})) {}', errors: errorsObject(useTest)},
    {code: 'while (f(function () {})) {}', errors: errorsObject(useTest)},
    {code: 'for   (;f(function () {});) {}', errors: errorsObject(useTest)},

    {code: 'if    (function f() {}()) {}', errors: errorsObject(useTest)},
    {code: 'if    (function f() {}) {}', errors: errorsObject(useTest)},

    {code: 'while (x && f(function () {})) {}', errors: errorsObject(useTest)},
    {code: 'while (function () {}.apply(null)) {}', errors: errorsObject(useTest)},
    {code: 'for (; (function () {}.call(null) || x) && y;) {}', errors: errorsObject(useTest)},

    {code: '!((f(function () {})))', errors: errorsObject(useTest)},
    {code: '!!((f(function () {})))', errors: errorsObject(useTest)},
    {code: 'Boolean(f(function () {}))', errors: errorsObject(useTest)}
  ]
})
