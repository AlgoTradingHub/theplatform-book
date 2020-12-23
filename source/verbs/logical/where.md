# Monadic & (where)

Returns integer vector of true positions in boolean vectors.

**Syntax:** ```&x; where x; &[x]; where [x]```

```o
o)&0101b
1 3
o)&(1>-1 0 1)
0 1
o)
```

When applied to integer vector, generates N indices of corresponding elements.

```o
o)&1 2 3
0 1 1 2 2 2
o)where 2 3 0 1
0 0 1 1 1 3
o)
```

::: see
[& and/minimum](/verbs/logical/andmin.md)
:::
