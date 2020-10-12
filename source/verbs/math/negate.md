# Monadic minus (negate)

Inverts signs of numbers. Right atomic. Use `-` or `neg`.

**Syntax:** ```-x; -[x]; neg x; neg[x]```

```o
o)-(1 2 3)
-1 -2 -3
o)neg(1 2 3)
-1 -2 -3
o)neg(1 2 3; -4 -5)
-1 -2 -3
4 5
```
