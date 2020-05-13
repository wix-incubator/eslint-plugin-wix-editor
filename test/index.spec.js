/* eslint-env mocha */
'use strict'

const plugin = require('../src')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

const rulesDir = '../src/rules'

function count(sub, str) {
  return (str.match(new RegExp(sub, 'g')) || []).length
}

function getRules(dir) {
  return fs.readdirSync(path.resolve(__dirname, dir))
    .filter(file => /\.js$/.test(file))
    .map(filePath => path.basename(filePath, '.js'))
}

const rules = getRules(rulesDir)

describe('all rule files should be exported, configured, and documented:', () => {
  const file = fs.readFileSync('./README.md').toString()

  rules.forEach(ruleName => {
    it(`should export ${ruleName}`, () => {
      assert.equal(plugin.rules[ruleName], require(path.join(rulesDir, ruleName)))
    })

    it(`should configure ${ruleName} off by default`, () => {
      assert.equal(plugin.rulesConfig[ruleName], 0)
    })

    it(`should mention ${ruleName} in the readme 3 times`, () => {
      assert.equal(count(ruleName, file), 3)
    })

    it(`should have a markdown file for rule ${ruleName}`, () => {
      assert.equal(fs.existsSync(path.join('./docs', `${ruleName}.md`)), true)
    })

    it(`should have a test file for rule ${ruleName}`, () => {
      assert.equal(fs.existsSync(path.join('./test/rules/', `${ruleName}.spec.js`)), true)
    })
  })
})
