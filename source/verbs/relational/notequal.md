# Dyadic <> (not equal)

Returns `1b` where `x` and `y` or their elements are not equal.

**Syntax:** ```x<>y; <>[x;y]```

```o
o)1<>2
1b
o)
o)1<>1
0b
o)1 0<>0 1
11b
o)1 0 <> 1
01b
o)(1; 2 3)<>(1 3;2)
01b
01b
o)
```

::: see
[= (equal)](/verbs/relational/equal.md)
:::
