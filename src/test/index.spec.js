/* eslint-env mocha */
'use strict'

var plugin = require('../..')
var assert = require('assert')
var fs = require('fs')
var path = require('path')

var rulesDir = '../main/rules'

function count(sub, str) {
  return (str.match(new RegExp(sub, 'g')) || []).length
}

function getRules(dir) {
  return fs.readdirSync(path.resolve(__dirname, dir))
    .filter(function isJavaScriptFile(file) {
      return /\.js$/.test(file)
    })
    .map(function getBasenameFromFilePath(filePath) {
      return path.basename(filePath, '.js')
    })
}

var rules = getRules(rulesDir)

describe('all rule files should be exported, configured, and documented:', function() {
  var file = fs.readFileSync('./README.md').toString()

  rules.forEach(function(ruleName) {
    it('should export ' + ruleName, function() {
      assert.equal(plugin.rules[ruleName], require(path.join(rulesDir, ruleName)))
    })

    it('should configure ' + ruleName + ' off by default', function() {
      assert.equal(plugin.rulesConfig[ruleName], 0)
    })

    it('should mention ' + ruleName + ' in the readme 3 times', function() {
      assert.equal(count(ruleName, file), 3)
    })

    it('should have a markdown file for rule ' + ruleName, function() {
      assert.equal(fs.existsSync(path.join('./docs', ruleName + '.md')), true)
    })

    it('should have a test file for rule ' + ruleName, function() {
      assert.equal(fs.existsSync(path.join('./src/test/rules/', ruleName + '.spec.js')), true)
    })
  })
})
