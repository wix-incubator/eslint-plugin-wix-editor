'use strict'

function isConditionCheck(node) {
  return node.parent && node.parent.test === node
}

function isNegationOperator(node) {
  return node.type === 'UnaryExpression' && node.operator === '!'
}

function isBooleanConstructorCall(node) {
  return node.type === 'CallExpression' && node.callee && node.callee.type === 'Identifier' && node.callee.name === 'Boolean'
}

// recursion:
// function isContainedInCondition(node) {
//     if (node.type === 'Program') {
//         return false;
//     }
//     return isConditionCheck(node) || isNegationOperator(node) || isBooleanConstructorCall(node) || isContainedInCondition(node.parent);
// }

// not-recursion:
function isContainedInCondition(node) {
  while (node) {
    if (isConditionCheck(node) || isNegationOperator(node) || isBooleanConstructorCall(node)) {
      return true
    }
    node = node.parent
  }
  return false
}

module.exports = function (context) {
  return {
    FunctionExpression(node) {
      try {
        if (isContainedInCondition(node)) {
          context.report({node, message: 'Define function outside boolean expression'})
        }
      } catch (e) {
        /* istanbul ignore next */
        context.report({node: context.getSource(node), message: `${e.toString()} ${e.stack}`})
      }
    }
  }
}
