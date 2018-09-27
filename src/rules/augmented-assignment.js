'use strict'

module.exports = function(context) {
  var qualifiedOperators = ['+', '-', '*', '/', '%', '<<', '>>', '&', '^', '|']

  function isQualifiedOperator(op) {
    return qualifiedOperators.indexOf(op) !== -1
  }

  return {
    AssignmentExpression: function(node) {
      try {
        if (
          node.operator === '=' &&
                  node.left &&
                  node.right &&
                  node.right.type === 'BinaryExpression' &&
                  isQualifiedOperator(node.right.operator) &&
                  node.right.left &&
                  node.right.right &&
                  context.getSource(node.left) === context.getSource(node.right.left)
        ) {
          context.report(
            node,
            'Prefer using augmented-assignment: {{left}} {{operator}}= {{right}}',
            {
              left: context.getSource(node.left),
              operator: node.right.operator,
              right: context.getSource(node.right.right)
            }
          )
        }
      } catch (e) {
        /* istanbul ignore next */
        context.report(node, e.toString() + ' ' + e.stack)
      }
    }
  }
}
