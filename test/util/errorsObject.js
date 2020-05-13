'use strict'

function errorsObject(...args) {
  const argumentsAsArray = Array.prototype.slice(...args)
  return argumentsAsArray.map(arg => ({message: arg}))
}

module.exports = errorsObject
