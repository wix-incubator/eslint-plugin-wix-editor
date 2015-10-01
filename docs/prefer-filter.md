# Prefer `filter` over `if` wrapped in a `forEach` (prefer-filter)

When it is required to execute a `forEach` callback for only part of an array's
values, a simple approach could be to start the `forEach` callback with an `if`
statement. Another would be to first `filter` the array, and then to execute
the `forEach` callback on all values of the resulting array.

## Rule Details

This rule is aimed to flag usages of `if` inside a `forEach` callback which
could be replaced with a `filter` before the `forEach`

The following patterns are considered problems:

```js
arr.forEach(function(val){
    if (val.hasProp) {
      // do stuff
    }
  })
```

The following patterns are not considered problems:

```js
arr
  .filter(function(val) {
    return val.hasProp
  })
  .forEach(function(val){
    // do stuff
  })
```


## Version
This rule was introduced in eslint-plugin-wix-editor 1.0.0.
