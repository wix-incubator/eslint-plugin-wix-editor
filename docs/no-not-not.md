# Prefer `Boolean(x)` over `!!x` (no-not-not)

`!!` is often used as a minimalist way to cast values to boolean.
While this has better performance than casting with the `Boolean` method,
it is in essence a hack, and reduces readability.


## Rule Details

This rule is aimed to flag usages of `!!` and suggest using `Boolean` instead.

The following patterns are considered problems:

```js
function isOdd(n) {
  return !!(n % 2)
}

var hasLength = !!arr.length
```

The following patterns are not considered problems:

```js
function isOdd(n) {
  return Boolean(n % 2)
}

var hasLength = Boolean(arr.length)
```


## When Not To Use It

When performance is an issue and the casting is executed a large amount of times.

<!-- ## Related -->


## Version
This rule was introduced in eslint-plugin-wix-editor 1.0.0.
