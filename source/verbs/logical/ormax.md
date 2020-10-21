# Dyadic | (or/max)

Applies boolean "or" for bool arguments. Fully atomic.

**Syntax:** ```x|y; |[x;y]```

```o
o)1b|010b
111b
o)(1>2)|2<1
0b
o)a:1010b
1010b
o)a|~a
1111b
o)
```

For number vectors, it results in calculating "max".

```o
o)1 2 3|0
1 2 3
o)1 2 3|3 2 1
3 2 3
o)
```

::: see
[& (and/min)](/verbs/logical/andmin.md)
:::
