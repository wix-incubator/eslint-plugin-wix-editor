const pkg = require('../package.json')

const repoUrl = 'https://github.com/wix/eslint-plugin-wix-editor'

module.exports = function docsUrl(ruleName, commitish = `v${pkg.version}`) {
  return `${repoUrl}/blob/${commitish}/docs/rules/${ruleName}.md`
}
