# Dyadic in (contains)

A dyadic verb that returns `1b` for each right vаlue present in the left argument.

**Syntax:** ```x in y; in[x;y]```

```o
o)1 in 1
1b
o)1 in 10
0b
o)1 in 1 0
1b
o) 1 2 3 in 3 4 5
001b
o)
```

`in` is often used in queries:

```o
o)t:([]a:1 2 3;b:1.1 2.2 3.3;c:`x`y`z)
a b   c
-------
1 1.1 x
2 2.2 y
3 3.3 z
o)select from t where a in 1 2
a b   c
-------
1 1.1 x
2 2.2 y
o)
```

::: see
[Queries](/queries.md)
:::
