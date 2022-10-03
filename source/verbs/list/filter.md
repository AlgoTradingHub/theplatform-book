# Dyadic filter

Returns elements from `y` for which `x` expression is true.

**Syntax:** ```x filter y; filter[x;y]```

```o
o)(0=x mod 2)filter x:1 5 6 8 11 17 20 21
6 8 20
o)filter[0=x mod 2;x:1 5 6 8 11 17 20 21]
6 8 20
o)(x>10)filter x:1 5 6 8 11 17 20 21
11 17 20 21
o)
```

::: see
[$ (conditional)](/verbs/conditional/cond.md)
:::
