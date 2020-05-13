'use strict'

function getArguments(args) {
  const result = {}
  args.forEach(arg => {
    if (arg.type === 'ArrayExpression') {
      result.requirements = arg
    } else if (arg.type === 'Literal') {
      result.name = arg
    } else if (arg.type === 'FunctionExpression') {
      result.cb = arg
    }
  })
  return result
}

module.exports = getArguments
