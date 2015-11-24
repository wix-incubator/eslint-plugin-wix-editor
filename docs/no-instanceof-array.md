# Prefer `Array.isArray` static method over `instanceof Array`

To test whether or not a variable is an array, it's better to use the native method Array.isArray over using the `instanceof` operator, since it returns `false` for arrays created in a different global scope, such as an iframe.

This method is available since ES5 and is supported in all major browsers.


## Rule Details

This rule is aimed to flag usages of the `instanceof` operator to test if a value is an array, and suggest using `Array.isArray()` instead.

The following patterns are considered problems:

```js
if (a instanceof Array) {
  //...
}

var isArray = a instanceof Array;
```

The following patterns are not considered problems:

```js
if (Array.isArray(a)) {
  //...
}

var isArray = Array.isArray(a);
```


## Version
This rule was introduced in eslint-plugin-wix-editor 1.0.2.
