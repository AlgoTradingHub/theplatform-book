# Monadic rc

Reference count of x

**Syntax:** ```rc x; rc[x]```

```o
o)a: 1 2 3
1 2 3
o)rc[a]
1
o)b:a
1 2 3
o)rc[a]
2
o)l:(a;b)
1 2 3
1 2 3
o)rc[a]
4
o)l:()
()
o)rc[a]
2
o)
```

::: see
[count](/verbs/math/count.md)
:::
