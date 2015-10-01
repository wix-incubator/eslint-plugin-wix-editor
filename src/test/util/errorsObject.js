'use strict'

function errorsObject() {
  var argumentsAsArray = Array.prototype.slice.call(arguments)
  return argumentsAsArray.map(function(arg) {
    return {message: arg}
  })
}

module.exports = errorsObject
