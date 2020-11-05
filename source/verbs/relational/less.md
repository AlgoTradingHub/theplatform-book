# Dyadic &lt (less than) and &lt= (up to)

Returns `1b` where `x` is less than (or up to) `y`. Fully atomic.

**Syntax:** ```x&lty; x&lt=y; &lt[x;y]; &lt=[x;y]```

```o
o)1 0 3&lt1
101b
o)10 20 30&lt=20 20 20
110b
o)(0;5 1)&gt(2 -2;3)
01b
10b
o)0.5&gt0 1 2 3f
1000b
o)
```

::: see
[>, >= (greater than, at least)](/verbs/relational/greater.md)
:::
