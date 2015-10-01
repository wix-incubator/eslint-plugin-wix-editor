# Forbid defining function inside boolean expressions (simplify-boolean-expression)

Function expressions can be very useful, but in some cases they might clutter the
code and make it less readable. Once such case is inside a boolean expression,
where a function expressions might cause the boolean expression be longer than
the code which depends on its value.

## Rule Details

This rule is aimed to flag usages of function expressions inside boolean
expressions and suggest extracting them for better readability.

The following patterns are considered problems:

```js
while (function(n) {/* something with n */}(i)) {
  i++
  // ...
}

if (arr.some(function(int) {
  return int > 2 && int % 2 === 0
})) {
  // ...
}
```

The following patterns are not considered problems:

```js
function checkInt(n) {/* something with n */}

while (checkInt(i)) {
  i++
  // ...
}

function isEvenAndGreaterThanTwo(int) {
  return int > 2 && int % 2 === 0
}

if (arr.some(isEvenAndGreaterThanTwo)) {
  // ...
}
```

## Version
This rule was introduced in eslint-plugin-wix-editor 1.0.0.
