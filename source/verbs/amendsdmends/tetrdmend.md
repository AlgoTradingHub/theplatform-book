# Tetradic . (dmend)

Applies a dyadic verb to a certain value.

**Syntax:** ```.[x;y;z;w]```

where `z` is a dyadic verb to be applied, `x` is a structure to be indexed in depth with a vector index `y` and `w` is the second argument of the verb.

```o
o)a:(1 2 3;4 5 6);
o).[a;0 1;+;1]
1 3 3
4 5 6
o)d:`a`b`c!(1 2;3 4;5 6);
o).[d;(`c;1);:;0]
a| 1 2
b| 3 4
c| 5 0
o)t:flip `a`b!(!3;3+!3)
a b
---
0 3
1 4
2 5
o).[t;(`b;0);+;10]
a b
----
0 13
1 4
2 5
o)
```

For destructive updates use variable symbol:

```o
o)a:(1 2 3;4 5 6); .[`a;0 1;+;1]
`a
o)a
1 3 3
4 5 6
o)
```

::: see
[. (triadic dmend)](/verbs/amendsdmends/trdmend.md)
[@ (triadic amend)](/verbs/amendsdmends/tramend.md)
[@ (tetradic amend)](/verbs/amendsdmends/tetramend.md)
[. (apply)](/verbs/indexing/dot.md)
[. (value)](/verbs/other/value.md)
:::
