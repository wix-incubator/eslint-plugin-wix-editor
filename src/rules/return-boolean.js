'use strict'

module.exports = function(context) {
  const getIfBody = require('../util/getIfBody.js')

  function isBodyReturningBoolean(body) {
    return body &&
               body.type === 'ReturnStatement' &&
               body.argument &&
               typeof body.argument.value === 'boolean'
  }

  return {
    IfStatement: function(node) {
      try {
        const consequent = getIfBody(node.consequent)
        const alternate = getIfBody(node.alternate)

        if (isBodyReturningBoolean(consequent) && isBodyReturningBoolean(alternate)) {
          if (consequent.argument.value === alternate.argument.value) {
            context.report(
              node,
              'this could be simplified to "return {{bool}}"',
              {bool: context.getSource(alternate.argument)}
            )
          } else {
            const boolPrefix = alternate.argument.value ? '!' : ''
            context.report(
              node,
              `this could be simplified to "return ${boolPrefix}Boolean({{test}})"`,
              {test: context.getSource(node.test)}
            )
          }
        }
      } catch (e) {
        /* istanbul ignore next */
        context.report(node, e.toString() + ' ' + e.stack)
      }
    }
  }
}
