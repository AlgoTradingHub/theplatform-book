# Monadic ceil

`ceil` returns the least integer greater or equal to the argument.

**Syntax:** ```ceil x; ceil [x]```

```o
o)ceil 10.5
11f
o)ceil -10.5
-10f
o)ceil -2.5 0 2.5
-2 -0 -2f
o)abs ceil -1.2
1f
o)
```

The function is atomic:

```o
o)ceil(2.3 4.5;6.7)
3 5f
7f
```

::: see
[floor](/verbs/math/floor.md)
[round](/verbs/math/round.md)
[frac](/verbs/math/frac.md)
:::
