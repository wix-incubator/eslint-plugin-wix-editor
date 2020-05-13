'use strict'

function isCallExpressionOfForEach(node) {
  return node.callee &&
    node.callee.property &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === 'forEach'
}

function isFunctionWithASingleIf(node) {
  return node &&
    node.type === 'FunctionExpression' &&
    node.body &&
    node.body.type === 'BlockStatement' &&
    node.body.body &&
    node.body.body.length === 1 &&
    node.body.body[0] &&
    node.body.body[0].type === 'IfStatement' &&
    !node.body.body[0].alternate
}

module.exports = function (context) {
  return {
    CallExpression(node) {
      try {
        if (isCallExpressionOfForEach(node) && isFunctionWithASingleIf(node.arguments[0])) {
          context.report({node, message: 'Use Array.filter instead of filtering inside the forEach'})
        }
      } catch (e) {
        /* istanbul ignore next */
        context.report({node, message: `${e.toString()} ${e.stack}`})
      }
    }
  }
}
