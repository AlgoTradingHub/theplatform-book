# Monadic ^ (null)

Checks if `x` is null.

**Syntax:** ```null x; null[x]; ^x; ^[x]```

```o
o)^1
0b
o)^0101b
0000b
o)^0N 1 2
100b
o)null 0
0b
o)null 0 1 2 3
0000b
o)null 0 1 2 3 0N
00001b
o)a:!9;
o)^ a?9
1b
o)dict:`a`b!(1 2);
o)^ dict[`c]
1b
o)
```


::: see
[~ (not)](/verbs/logical/not.md)
[^ (fill)](/verbs/list/fill.md)
:::
