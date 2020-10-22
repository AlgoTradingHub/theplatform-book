# Dyadic & (and/min)

Applies boolean "and" for bool arguments. Fully atomic.

**Syntax:** ```x&y; x and y; &[x;y]; and[x;y]```

```o
o)10b&1b
010b
o)a:1010b
1010b
o)a&~a
0000b
o)
```

For number vectors, it results in calculating "min".

```o
o)1 2 3&0 2 1
0 2 1
o)0&(-2 + til 5)
-2 -1 0 0 0
o)
```

::: see
[| (or/max)](/verbs/logical/ormax.md)
:::
