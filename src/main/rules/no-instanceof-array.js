'use strict'

module.exports = function(context) {
  return {
    BinaryExpression: function(node) {
      if (node.operator === 'instanceof' && node.right.type === 'Identifier' && node.right.name === 'Array') {
        var leftOperandText = context.getSourceCode().getText(node.left)
        context.report(node, 'Use `Array.isArray(' + leftOperandText + ')` instead of `' + leftOperandText + ' instanceof Array`')
      }
    }
  }
}
