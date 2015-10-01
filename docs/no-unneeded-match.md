# Prefer `RegExp.prototype.test` over `String.prototype.match` (no-unneeded-match)

While the `String.prototype.match` method is intended for retrieving matches of
a regular expression, it is often used only to check if a string matches the
full regular expression. In those cases, `RegExp.prototype.test` can be used
instead, and has better performance.

## Rule Details

This rule is aimed to flag usages of `String.prototype.match` which are being
cast to boolean, and therefore can be replaced with `RegExp.prototype.test`.

The following patterns are considered problems:

```js
if (name.match(/[adhnsy]+/i)) {
  // ...
}

function isGood(str, regexp) {
  return str.match(regexp) ? 'Yes!' : 'No :['
}

var doesMatch = Boolean("".match(/a/))
```

The following patterns are not considered problems:

```js
if (/[adhnsy]+/i.test(name)) {
  // ...
}

function isGood(str, regexp) {
  return regexp.test(str) ? 'Yes!' : 'No :['
}

var doesMatch = /a/.test("")
```

<!-- ## Related -->


## Version
This rule was introduced in eslint-plugin-wix-editor 1.0.0.
