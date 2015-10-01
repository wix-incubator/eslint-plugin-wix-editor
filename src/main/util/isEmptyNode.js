'use strict'

function isEmptyNode(node) {
  if (!node) {
    return null
  }
  if (node.type === 'BlockStatement' && node.body.every(isEmptyNode)) {
    return true
  }
  if (node.type === 'EmptyStatement') {
    return true
  }
  return false
}

module.exports = isEmptyNode
