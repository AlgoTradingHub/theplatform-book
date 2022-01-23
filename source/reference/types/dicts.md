# Dicts

A dict is a mapping between two vectors of the same length: keys and values.
The syntax for creating a dictionary uses an exclamation mark:

```o
o)`a`b`c!1 2 3
a| 1
b| 2
c| 3
o)`a`b`c!1 2
** eval error: `!`:
arguments length mismatch: [`a`b`c;1 2]
o)
```

A dictionary can be decomposed into key and value vectors:

```o
o)d:`a`b`c!(1 2 3)
a| 1
b| 2
c| 3
o)key d
`a`b`c
o)value d
1 2 3
o)
```

To look up a value in dict by key use square brackets:

```o
o)d[`c]
3
o)
```

If a value is not in a dict, look up will result in a null of the present values' type:

```o
o)d[`z]
0N
o)
```

You can flip a dictionary to get a table and vice versa:

```o
o)flip `a`b`c!(1 2 3)
a b c
-----
1 2 3
o)flip ([]a:1 2 3;b:1.1 2.2 3.3)
a| 1 2 3
b| 1.1 2.2 3.3
o)
```

Keys in dictionaries can be non-unique, but look-up will only return the first occuring value:

```o
o)d:`a`b`c`a!(1 2 3 4); d[`a]
1
o)
```

Both keys and values can be nested lists but this should be taken into account while looking up value:

```o
o)d:(`a`b; `c`d`e; enlist `f)!1 2 3
`a`b  | 1
`c`d`e| 2
,`f   | 3
o)d[enlist `f]
3
o)d[`f]
0N
o)d[`a`b]
1
o)d[`b]
0N
o)
```

::: see
[flip](/verbs/other/flip.md)
[! (internal type id)](/verbs/type/excl.md)
[! (til)](/verbs/math/til.md)
:::
