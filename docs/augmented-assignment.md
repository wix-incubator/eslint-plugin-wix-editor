# Prefer augmented assignment on code duplication (augmented-assignment)

Augmented assignment (`a += 2`) enables assigning the result of a binary
operator of a variable to itself. This means that the variable is only mentioned
once, instead of twice (as in `a = a + 2`), and this often improved readability,
as augmented assignment would read "add 2 to a" where the alternative would read
"set a to equal a plus 2".


## Rule Details

This rule is aimed to flag statements structured as
`Identifier = Identifier BinaryExpression Expression`
and suggest the augmented assignment alternative.

The following patterns are considered problems:

```js
x = x * 2

a.b.c = a.b.c & mask

people[name].address = people[name].address + '\n' + country
```

The following patterns are not considered problems:

```js
x *= 2

a.b.c &= mask

people[name].address += '\n' + country
```

<!-- ## Related -->


## Version
This rule was introduced in eslint-plugin-wix-editor 1.0.0.
