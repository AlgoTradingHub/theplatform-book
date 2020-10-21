# Dyadic > (greater) and >= (greater or equal)

Returns `1b` where `x` is greater than (or at least) `y`. Fully atomic.

**Syntax:** ```x>y; x>=y; >[x;y]; >=[x;y]```

```o
o)1 -1 11 > 1
001b
o)111 222 333>=100 300 333
101b
o)(0;5 2)>(2 -2;3)
01b
10b
o)1.1>0 1 2f
110b
o)
```

::: see
[<, <= (less than, up to)](/verbs/relational/greater.md)
:::
