'use strict'

function errorsObject() {
  const argumentsAsArray = Array.prototype.slice.call(arguments)
  return argumentsAsArray.map(arg => ({message: arg}))
}

module.exports = errorsObject
