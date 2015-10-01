# Prefer a single return over a boolean returning if-else. (return-boolean)

When the contents of an `if` block and its `else` block are both a single return
statement of a literal boolean, the `if-else` can be replaced with a single
return statement of `true`, `false`, `testedExpression`, or `!testedExpression`.

## Rule Details

This rule is aimed to flag cases in which a boolean-letaral-returning
`if`/`else` can be replaced with a single return statement.

The following patterns are considered problems:

```js
function f() {
  if (b) {
    return false
  } else {
    return true
  }
}
```

The following patterns are not considered problems:

```js
function f() {
  return !b
}
```


## Version
This rule was introduced in eslint-plugin-wix-editor 1.0.0.
