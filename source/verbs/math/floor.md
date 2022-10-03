# Monadic floor

`floor` returns the greatest integer less or equal to the argument.

**Syntax:** ```floor [x]```

```o
o)floor[10.5]
10f
o)floor[-10.5]
-11f
o)floor[-2.5 0 2.5]
-3 0 2f
o)abs floor[-1.2]
2f
o)
```

The function is atomic:

```o
o)floor[(2.3 4.5;6.7)]
2 4f
6f
o)
```

::: see
[ceil](/verbs/math/ceil.md)
[round](/verbs/math/round.md)
[frac](/verbs/math/frac.md)
:::
