'use strict'

module.exports = {
  rules: {},
  rulesConfig: {}
};
[
  'no-not-not',
  'no-unneeded-match',
  'prefer-filter',
  'prefer-ternary',
  'return-boolean',
  'simplify-boolean-expression',
  'no-instanceof-array',
  'no-internal-import'
].forEach(name => {
  module.exports.rules[name] = require(`./rules/${name}.js`)
  module.exports.rulesConfig[name] = 0
})
