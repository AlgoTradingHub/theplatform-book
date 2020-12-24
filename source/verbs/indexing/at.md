# Dyadic @ (at)

Indexes left argument (vector/list/dict) by right argument.

**Syntax:** ```x@y; @[x;y]```

```o
o)1 2 3@0 1
1 2
o)@[til 10;2 8]
2 8
o)(`a`b!1 2)@`b`a`c
2 1 0N
o)t:([]a:1 2 3;b:`a`b`c)
a b
---
1 a
2 b
3 c
o)t@2
a| 3
b| `c
o)
```

::: see
[. (indexing in depth)](/verbs/indexing/dot.md)
[@ (internal type id)](/verbs/type/attype.md)
[@ (triadic amend)](/verbs/amendsdmends/tramend.md)
[@ (tetradic amend)](/verbs/amendsdmends/tetramend.md)
:::
