'use strict'

var rule = require('../../main/rules/prefer-ternary')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()
var errorsObject = require('../util/errorsObject')

function message(v) {
  return 'use ternary instead of if-else for assignment of ' + v
}

ruleTester.run('prefer-ternary', rule, {
  valid: [
        {code: 'if (b) { x = 3 } else { y = 4 }'},
        {code: 'if (b) { x = 3 } else {}'}
  ],
  invalid: [
        {code: 'if (b) y = 1; else y = 2', errors: errorsObject(message('y'))},
        {code: 'if (b) a.y = 1; else a.y = 2', errors: errorsObject(message('a.y'))},
        {code: 'if (b) y = p; else y = q', errors: errorsObject(message('y'))},
        {code: 'if (b) y = f1(); else y = f2()', errors: errorsObject(message('y'))},
        {code: 'if (b) { y = 1 } else y = 2', errors: errorsObject(message('y'))},
        {code: 'if (b) y = 1; else { y = 2 }', errors: errorsObject(message('y'))},
        {code: 'if (b) { y = 1 } else { y = 2 }', errors: errorsObject(message('y'))}
  ]
})
