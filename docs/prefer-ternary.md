# Prefer the ternary operator over `if-else` for assigning a value. (prefer-ternary)

When the content of an `if` block is a single assignment, and its `else` block
also has a single assignment to the same variable, the `if` block and the `else`
block become very similar and contain code duplication. An alternative is to use
a single assignment of the result of a ternary operator.

## Rule Details

This rule is aimed to flag cases in which an `if`/`else` pair could be replaced
with a single assignment with a ternary operator.

The following patterns are considered problems:

```js
if (b) y = 1
else y = 2

if (b) {
  y = f1()
} else {
  y = f2()
}
```

The following patterns are not considered problems:

```js
y = b ? 1 : 2

y = b ? f1() : f2()
```


## Version
This rule was introduced in eslint-plugin-wix-editor 1.0.0.
