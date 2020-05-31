'use strict'
const docsUrl = require('../docsUrl')
const minimatch = require('minimatch')
const isInternalPath = require('../util/isInternalPath')

function isStaticRequire(node) {
  return node &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require' &&
    node.arguments.length === 1 &&
    node.arguments[0].type === 'Literal' &&
    typeof node.arguments[0].value === 'string'
}

module.exports = {
  meta: {
    type: 'suggestion', // 'problem',
    docs: {
      url: docsUrl('no-internal-import')
    },
    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        },
        additionalProperties: false
      }
    ]
  },

  create: function noReachingInside(context) {
    const options = context.options[0] || {}
    const allowRegexps = (options.allow || []).map(p => minimatch.makeRe(p))
    // console.log(options)

    // test if reaching to this destination is allowed
    function reachingAllowed(importPath) {
      // console.log('reachingAllowed', importPath, allowRegexps.some(re => re.test(importPath)))
      return allowRegexps.some(re => re.test(importPath))
    }

    function checkImportForReaching(importPath, node) {
      if (node.parent.importKind !== 'type' && isInternalPath(importPath) && !reachingAllowed(importPath)) {
        context.report({node, message: `Reaching to "${importPath}" is not allowed.`})
      }
    }

    return {
      ImportDeclaration(node) {
        checkImportForReaching(node.source.value, node.source)
      },
      CallExpression(node) {
        if (isStaticRequire(node)) {
          const [firstArgument] = node.arguments
          checkImportForReaching(firstArgument.value, firstArgument)
        }
      }
    }
  }
}
