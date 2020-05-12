'use strict'
const getIfBody = require('../util/getIfBody.js')

function isBodyReturningBoolean(body) {
  return body &&
             body.type === 'ReturnStatement' &&
             body.argument &&
             typeof body.argument.value === 'boolean'
}

module.exports = function(context) {
  return {
    IfStatement: function(node) {
      try {
        const consequent = getIfBody(node.consequent)
        const alternate = getIfBody(node.alternate)

        if (isBodyReturningBoolean(consequent) && isBodyReturningBoolean(alternate)) {
          if (consequent.argument.value === alternate.argument.value) {
            context.report({node: node, message: 'this could be simplified to "return {{bool}}"', data: {bool: context.getSource(alternate.argument)}})
          } else {
            const boolPrefix = alternate.argument.value ? '!' : ''
            context.report({node: node, message: `this could be simplified to "return ${boolPrefix}Boolean({{test}})"`, data: {test: context.getSource(node.test)}})
          }
        }
      } catch (e) {
        /* istanbul ignore next */
        context.report({node, message: `${e.toString()} ${e.stack}`})
      }
    }
  }
}
