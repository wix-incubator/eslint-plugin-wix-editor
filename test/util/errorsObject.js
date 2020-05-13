'use strict'

function errorsObject(...args) {
  return args.map(message => ({message}))
}

module.exports = errorsObject
