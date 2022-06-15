# Frac

`frac` returns the fractional part of float for the argument.

**Syntax:** ```frac x; frac [x]```

```o
o)frac[10.5]
0.5
o)frac[-10.5]
-0.5
o)frac[(-2.5; 0.0; 2.5)]
-0.5 0 0.5
o)frac[-1.14 0.14 2.14]
-0.14 0.14 0.14
o)
```

The function is atomic:

```o
o)frac(2.3 4.5;6.7)
0.3 0.5
0.7
```

::: see
[ceil](/verbs/math/ceil.md)
[floor](/verbs/math/floor.md)
[round](/verbs/math/round.md)
:::
