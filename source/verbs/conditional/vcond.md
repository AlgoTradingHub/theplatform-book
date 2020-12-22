# Triadic ? (vector conditional)

This verb returns value made of second or third argument depending on first boolean scalar or vector argument.
Think about vector if-then-else expression. Boolean truth results in second argument usage, false - in third one.

First scalar boolean is the same condition expression.
```o
o)?[1b;1;2]
1
o)?[0b;0 1 2;2 2 3]
2 2 3
o)
```

First vector boolean is much more useful. Second and third argument should have compatible types. All arguments must have the same shape.

```o
o)?[011b;2 2 3;1 1 1]
1 2 3
o)?[001b;1;(2;"123";3)]
2
"123"
1
o)
```

::: see
[conditional](/verbs/conditional/cond.md)
[? (search)](/verbs/search/search.md)
:::
