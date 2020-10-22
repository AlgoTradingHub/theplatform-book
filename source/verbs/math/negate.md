# Monadic minus (negate)

Inverts signs of numbers. Right atomic.

**Syntax:** ```-x; -[x]; neg x; neg[x]```

```o
o)-(1 2 3)
-1 -2 -3
o)neg(1 2 3)
-1 -2 -3
o)neg(1 2 3; -4 -5)
-1 -2 -3
4 5
o)neg 01001b
10110b
o)
o)-(2<3)
0b
o)
```

Null does not have a sign:

```o
o)neg (0W;-0w;0N)
-0W
0w
0N
o)
```

::: see
[~ (not)](/verbs/logical/not.md)
:::
