'use strict'

module.exports = function (context) {
  function reportOn(node, bool) {
    if (bool) {
      context.report({node, message: 'Use `Regex.test() instead`'})
    }
  }

  function isNodeMatchCall(node) {
    return node &&
            node.callee &&
            node.callee.type === 'MemberExpression' &&
            node.callee.computed === false &&
            node.callee.property &&
            node.callee.property.type === 'Identifier' &&
            node.callee.property.name === 'match' &&
            node.arguments &&
            node.arguments.length === 1 &&
            node.arguments[0].type === 'Literal' &&
            node.arguments[0].regex
  }

  function checkTestNode(node) {
    try {
      reportOn(node, node.test && node.test.type === 'CallExpression' && isNodeMatchCall(node.test))
    } catch (e) {
      /* istanbul ignore next */
      context.report({node, message: `${e.toString()} ${e.stack}`})
    }
  }

  return {
    IfStatement: checkTestNode,
    WhileStatement: checkTestNode,
    ForStatement: checkTestNode,
    ConditionalExpression: checkTestNode,
    UnaryExpression(node) {
      try {
        reportOn(node, node.operator === '!' && isNodeMatchCall(node.argument))
      } catch (e) {
        /* istanbul ignore next */
        context.report({node, message: `${e.toString()} ${e.stack}`})
      }
    },
    CallExpression(node) {
      try {
        reportOn(node,
          node.callee &&
                    node.callee.type === 'Identifier' &&
                    node.callee.name === 'Boolean' &&
                    node.arguments &&
                    node.arguments.length &&
                    isNodeMatchCall(node.arguments[0])
        )
      } catch (e) {
        /* istanbul ignore next */
        context.report({node, message: `${e.toString()} ${e.stack}`})
      }
    }
  }
}
