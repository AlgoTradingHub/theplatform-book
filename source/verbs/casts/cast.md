# Dyadic $ (cast)

Converts right arg values according to left arg specification.

**Syntax:** ```x$y; $[x;y]```

Where `x` is a lower-case letter or symbol from the table below. Returns `y` cast according to `x`.

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

```o
o)"i"$12
12i
o)`bool$1
1b
o)"j"$1.1
1
o)
o)"f"$10
10f
o)
o)"d"$2020.12.20D11:39:42.550501414
2020.12.20
```

Casting to a string has a shorthand form: ``$x``

```o
o)$123
"123"
o)$2020.12.11D11:39:42.550501414
"2020.12.11D11:39:42.550501414"
o)$!10
"0"
"1"
"2"
"3"
"4"
"5"
"6"
"7"
"8"
"9"
o)
```

::: note
You can use short form `$` cast to string only for scalars and a list of scalars.
Monadic `repr` represents a value of any type.
:::

::: see
[Types, Casting, etc](/reference/types/types.md)
[repr](/verbs/casts/repr.md)
:::
