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

```o
o)4 mod 6 5 4 3 2
4 4 0 1 0
o)(11 15;18 19 20) mod 5
1 0
3 4 0
o)10 19 mod 3 4
1 3
o)
```

::: see
[% (dyadic division)](/verbs/math/division.md)
:::
