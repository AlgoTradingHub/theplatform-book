# Dyadic &lt> (not equal)

Returns `1b` where `x` and `y` or their elements are not equal.

**Syntax:** ```x&lt>y; &lt>[x;y]```

```o
o)1&lt>2
1b
o)
o)1&lt>1
0b
o)1 0&lt>0 1
11b
o)1 0 &lt> 1
01b
o)(1; 2 3)&lt>(1 3;2)
01b
01b
o)
```

::: see
[= (equal)](/verbs/relational/equal.md)
:::
