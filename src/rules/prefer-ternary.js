'use strict'
const getIfBody = require('../util/getIfBody.js')

function isBodyExpressionWithAssignment(body) {
  return body &&
             body.type === 'ExpressionStatement' &&
             body.expression &&
             body.expression.type === 'AssignmentExpression'
}

module.exports = function(context) {
  function areEqual(a, b) {
    return context.getSource(a) === context.getSource(b)
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
          context.report({node: node, message: 'use ternary instead of if-else for assignment of {{left}}', data: {left: context.getSource(alternate.expression.left)}})
        }
      } catch (e) {
        /* istanbul ignore next */
        context.report({node, message: `${e.toString()} ${e.stack}`})
      }
    }
  }
}
