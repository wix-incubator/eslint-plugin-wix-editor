'use strict'

module.exports = function(context) {
  return {
    BinaryExpression: function(node) {
      if (node.operator === 'instanceof' && node.right.type === 'Identifier' && node.right.name === 'Array') {
        const leftOperandText = context.getSourceCode().getText(node.left)
        context.report({node: node, message: `Use 'Array.isArray(${leftOperandText})' instead of '${leftOperandText} instanceof Array'`})
      }
    }
  }
}
