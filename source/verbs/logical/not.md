# Monadic ~ (not)

Inverts boolean vector. Right atomic.

**Syntax:** ```~x; ~[x]```

```o
o)~1010b
0101b
o)~1<2
0b
o)~(1>2 0 -1)
100b
o)
```

... or checks for zeroes if `x` is a number:

```o
o)~1 0 3f
010b
o)~(100 - 10 100 1000)
010b
o)
```

::: see
[- (negate)](/verbs/math/negate.md)
:::
