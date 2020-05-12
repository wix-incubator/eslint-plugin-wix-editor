const parse = require('./parse')
const _ = require('lodash')

/**
 'some-package'
 './file'
 './folder/file'
 '../folder/file'

 'some-package/a'

 package-a/src/a
 package-b/src/a
 */
function isInternalPath(p) {
  const pp = parse.parse(p)
  return pp.pkg && !_.isEmpty(pp.pth)
}

// // const URL = require('url');
// console.log(isInternalPath('a'))
// console.log(isInternalPath('@a/b'))
// console.log(isInternalPath('../a'))
// console.log(isInternalPath('../a'))
//
// // invalid
// console.log(isInternalPath('@a/b/c'))
// console.log(isInternalPath('b/c'))

module.exports = isInternalPath
