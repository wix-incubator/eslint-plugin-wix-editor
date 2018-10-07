'use strict'

function isEmptyNode(node) {
  if (!node) {
    return null
  }
  if (node.type === 'BlockStatement' && node.body.every(isEmptyNode)) {
    return true
  }
  return node.type === 'EmptyStatement'
}

module.exports = isEmptyNode
