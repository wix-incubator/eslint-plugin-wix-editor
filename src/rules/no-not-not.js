'use strict'

function isNot(node) {
  return node.type === 'UnaryExpression' && node.operator === '!'
}

module.exports = function (context) {
  return {
    UnaryExpression(node) {
      try {
        if (!isNot(node.parent) && isNot(node) && isNot(node.argument)) {
          context.report({node, message: 'Cast to boolean with `Boolean()`'})
        }
      } catch (e) {
        /* istanbul ignore next */
        context.report({node, message: `${e.toString()} ${e.stack}`})
      }
    }
  }
}
