# Monadic round

`round` returns the rounded integer for the argument.

**Syntax:** ```round x; round [x]```

```o
o)round 10.5
11f
o)round -10.5
-11f
o)round -2.5 0 2.5
-3 -0 -3f
o)abs round -1.2
1f
o)
```

The function is atomic:

```o
o)round(2.3 4.5;6.7)
2 5f
7f
```

::: see
[ceil](/verbs/math/ceil.md)
[floor](/verbs/math/floor.md)
[frac](/verbs/math/frac.md)
:::
