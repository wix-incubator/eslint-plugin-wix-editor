'use strict'
// const path = require('path')
// const fs = require('fs-extra')
const _ = require('lodash')

/**
 * @param {string} src
 * @return {{pth: string, scope?: string, pkg?: string}}
 */
function parse(src) {
  const arr = src.split('/')
  let scope
  let pkg
  let pth

  if (arr[0].charAt(0) === '@') {
    [scope, pkg] = arr
    pth = _.takeRight(arr, arr.length - 2).join('/')
  } else if (arr[0].charAt(0) === '.') {
    pth = src
  } else {
    [pkg] = arr
    pth = _.takeRight(arr, arr.length - 1).join('/')
  }
  return {scope, pkg, pth}
}

function fqn(pkg) {
  return pkg.scope ? `${pkg.scope}/${pkg.pkg}` : pkg.pkg
}

const getModuleName = p => fqn(parse(p))

// function getPkgJson(module) {
//     let pth = path.dirname(module)
//     while (getPkgAtDir(pth) === false) {
//         pth = path.dirname(pth)
//     }
//     console.log(pth)
// }

// function getPkgAtDir(dir) {
//     const p = path.join(dir, 'package.json')
//     return fs.existsSync(p)
// }

module.exports = {
  parse,
  fqn,
  getModuleName
}
