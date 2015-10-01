'use strict'

var rule = require('../../main/rules/augmented-assignment')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()
var errorsObject = require('../util/errorsObject')

function prefer(code) {
  return errorsObject('Prefer using augmented-assignment: ' + code)
}
ruleTester.run('augmented-assignment', rule, {
  valid: [
    'x = 1 + x', // wrong order
    'x = x + y + w', // should be cought, but too complicated given all the permutations:
    'x = x * y + w',
    'a = b + 1',
    'a.a.b = a.b.b + 1',
    'a.a.b = a.b.b + 1'
  ],
  invalid: [
    {code: 'x = x + 2', errors: prefer('x += 2')},
    {code: 'x = x - 2', errors: prefer('x -= 2')},
    {code: 'x = x * 2', errors: prefer('x *= 2')},
    {code: 'x = x / 2', errors: prefer('x /= 2')},
    {code: 'x = x % 2', errors: prefer('x %= 2')},
    {code: 'x = x << 2', errors: prefer('x <<= 2')},
    {code: 'x = x >> 2', errors: prefer('x >>= 2')},
    {code: 'x = x & 2', errors: prefer('x &= 2')},
    {code: 'x = x ^ 2', errors: prefer('x ^= 2')},
    {code: 'x = x | 2', errors: prefer('x |= 2')},

    {code: 'x = x + y', errors: prefer('x += y')},
    {code: 'x = x * (y + w)', errors: prefer('x *= y + w')},
    {code: 'a.b.c = a.b.c + 3', errors: prefer('a.b.c += 3')}
  ]
})
