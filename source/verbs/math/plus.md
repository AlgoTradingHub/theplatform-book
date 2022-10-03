# Dyadic + (plus)

Adds scalar/vector elements. Fully atomic.

**Syntax:** ``x+y, +[x;y]``

Where `x` and `y` are numeric scalars or vectors, returns their sum.

```o
o)1+2
3
o)2+3 4 5
5 6 7
o)1 2 3+4
5 6 7
o)1 2 3+4 5 6
5 7 9
o)1 2 3+4 5 6 7
** eval error: `+`:
arguments length mismatch: [1 2 3;4 5 6 7]
o)
```

Where numeric vаlue is added to a dictionary or a table, the verb adds up the numeric vаlue to numeric vаlues in the dict/table:

```o
o)10+`a`b`c!1 2 3
a| 11
b| 12
c| 13
o)([sym:`a`b`c]x:1.5 2.2 0.3; y:20.4 13.0 2.5)+0.5
x   y
--------
2   20.9
2.7 13.5
0.8 3
o)
```

::: see
[sum](/verbs/math/sum.md)
:::
