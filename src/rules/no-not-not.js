'use strict'

module.exports = function(context) {
  function isNot(node) {
    return node.type === 'UnaryExpression' && node.operator === '!'
  }

  return {
    UnaryExpression: function(node) {
      try {
        if (!isNot(node.parent) && isNot(node) && isNot(node.argument)) {
          context.report(node, 'Cast to boolean with `Boolean()`')
        }
      } catch (e) {
        /* istanbul ignore next */
        context.report(node, e.toString() + ' ' + e.stack)
      }
    }
  }
}
