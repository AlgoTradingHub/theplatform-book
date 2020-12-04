# Dyadic $ (cast)

Converts right arg values according to left arg specification.

**Syntax:** ```x$y; $[x;y]```

Where x is:
- a lower-case letter, or symbol from the following table, returns y cast according to x

| Type letter | Type symbol |
| --- | --- |
| "b" | `bool |
| "x" | `byte |
| "h" | `short |
| "i" | `int |
| "j" | `long |
| "s" | `symbol |
| "c" | `char |
| "g" | `guid |
| "e" | `real |
| "f" | `float |
| "p" | `timestamp |
| "n" | `timespan |
| "z" | `datetime |
| "d" | `date |
| "m" | `month |
| "t" | `time |
| "u" | `minute |
| "v" | `second |


Casting to a string although has a shorthand form: ``$x``

```o
o)"i"$12
12i
o)`bool$1
1b
o)$123
"123"
o)
```

::: see
[Types, Casting, etc](/reference/types/types.md)
[Repr](/reference/verbs/casts/repr.md)
:::
