# Dyadic < (less than) and <= (up to)

Returns `1b` where `x` is less than (or up to) `y`. Fully atomic.

**Syntax:** ```x<y; x<=y; <[x;y]; <=[x;y]```

```o
o)1 0 3<1
101b
o)10 20 30<=20 20 20
110b
o)(0;5 1)>(2 -2;3)
01b
10b
o)0.5>0 1 2 3f
1000b
o)
```

::: see
[>, >= (greater than, at least)](/verbs/relational/greater.md)
:::
