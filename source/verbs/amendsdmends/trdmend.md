# Triadic . (dmend)

Applies a monadic verb to a certain value.

**Syntax:** ```.[x;y;z]```

where `z` is a monadic verb to be applied and `x` is a structure to be indexed in depth with a vector index `y`.

```o
o)l:(1 2 3;4 5 6); .[l;0 1;{x+1}]
1 3 3
4 5 6
o)d:`a`b`c!(1 2;3 4;5 6);
o).[d;(`a;0);{x+1}]
a| 2 2
b| 3 4
c| 5 6
o)t:flip `a`b!(!3;3+!3)
a b
---
0 3
1 4
2 5
o).[t;(`b;2);{x*3}]
a b
----
0 3
1 4
2 15
o)
```

For destructive updates use variable symbol in the first argument:

```o
o)a:(1 2 3;4 5 6); .[`a;0 1;{x+1}]
`a
o)a
1 3 3
4 5 6
o)
```

::: note
In triadic dmend the last argument should be monadic, but some verbs are treated as dyadic..
Use `:` after the verb to indicate the use of monadic.
:::

```o
o)a: (!5; !4)
0 1 2 3 4
0 1 2 3
o).[a;1 3; -]
** eval error: `amend vec`:
invalid type: [``dyad]
o).[a;1 3; -:]
0 1 2 3 4
0 1 2 -3
o)
```


::: see
[. (tetradic dmend)](/verbs/amendsdmends/tetrdmend.md)
[@ (triadic amend)](/verbs/amendsdmends/tramend.md)
[@ (tetradic amend)](/verbs/amendsdmends/tetramend.md)
[. (apply)](/verbs/indexing/dot.md)
[. (value)](/verbs/other/value.md)
:::
