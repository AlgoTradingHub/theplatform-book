# Tetradic @ (amend)

Applies a dyаdic verb to a certain vаlue.

**Syntax:** ```@[x;y;z;w]```

where `z` is a dyаdic verb to be applied, `x` is a structure to be indexed with `y` and `w` is the second argument of the verb.

```o
o)a:1 2 3; @[a;2;+;1]
1 2 4
o)d:`a`b`c!(1 2;3 4;5 6);
o)@[d;`b;*;2]
a| 1 2
b| 6 8
c| 5 6
o)t:flip `a`b!(!3;3+!3)
a b
---
0 3
1 4
2 5
o)@[t;`a;:;0]
a b
---
0 3
0 4
0 5
o)
```

For destructive updates use variable symbol:

```o
o)a:1 2 3; @[`a;2;+;1]
`a
o)a
1 2 4
o)
```

::: see
[@ (indexing)](/verbs/indexing/at.md)
[@ (internal type id)](/verbs/type/attype.md)
[@ (triadic amend)](/verbs/amendsdmends/tramend.md)
[. (triadic dmend)](/verbs/amendsdmends/trdmend.md)
[. (tetradic dmend)](/verbs/amendsdmends/tetrdmend.md)
:::
