'use strict'

function getIfBody(exp) {
  if (!exp) {
    return null
  }
  if (exp.type !== 'BlockStatement') {
    return exp
  } else if (exp.type === 'BlockStatement' && exp.body.length === 1) {
    return exp.body[0]
  }
  return null
}

module.exports = getIfBody
