'use strict'

module.exports = function(context) {
  const getIfBody = require('../util/getIfBody.js')

  function areEqual(a, b) {
    return context.getSource(a) === context.getSource(b)
  }

  function isBodyExpressionWithAssignment(body) {
    return body &&
               body.type === 'ExpressionStatement' &&
               body.expression &&
               body.expression.type === 'AssignmentExpression'
  }

  return {
    IfStatement: function(node) {
      try {
        const consequent = getIfBody(node.consequent)
        const alternate = getIfBody(node.alternate)

        if (
          isBodyExpressionWithAssignment(consequent) &&
          isBodyExpressionWithAssignment(alternate) &&
          areEqual(consequent.expression.left, alternate.expression.left)
        ) {
          context.report(
            node,
            'use ternary instead of if-else for assignment of {{left}}',
            {left: context.getSource(alternate.expression.left)}
          )
        }
      } catch (e) {
        /* istanbul ignore next */
        context.report(node, e.toString() + ' ' + e.stack)
      }
    }
  }
}
