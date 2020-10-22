# Dyadic ~ (match)

Returns `1b` where `x` and `y` are identical.

**Syntax:** ```x~y; ~[x;y]```

```o
o) 1 0 3 ~ 1 2 3
0b
o) 1 2 3 ~ 1 2 3
1b
o)
```

This verb compares both values and types:

```o
o)1~1.0
0b
o)1f~10f%10f
1b
o)0~00:00:00
0b
o)`a~"a"
0b
o)
```

::: see
[= (equal)](/verbs/relational/equal.md)
:::
