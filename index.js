'use strict'

module.exports = {
  rules: {},
  rulesConfig: {}
}

;[
  'augmented-assignment',
  'no-not-not',
  'no-unneeded-match',
  'prefer-filter',
  'prefer-ternary',
  'return-boolean',
  'simplify-boolean-expression'
].forEach(function(name) {
  module.exports.rules[name] = require('./src/main/rules/' + name + '.js')
  module.exports.rulesConfig[name] = 0
})
