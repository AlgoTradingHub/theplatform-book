# Dyadic mod

Returns the `x%y` division remainder.

**Syntax:** ```x mod y; mod[x;y]```

```o
o)1 mod 2
1
o)2 mod 2
0
o)10 17 103 mod 5
0 2 3
o)10 20 30 mod 3 2 7
1 0 2
o)3 2 7 mod 10 20 30
3 2 7
o)
```

If `y` is vector and `x` is scalar, `mod` returns `y%x` division remainder:

```o
o)2 mod 2 6 5 4
0 0 1 0
o)5 mod (11 15;18 19 20)
1 0
3 4 0
o)
```

::: see
[% (dyadic division)](/verbs/math/division.md)
:::
