# Triadic @ (amend)

Applies a monadic verb to a certain value.

**Syntax:** ```@[x;y;z]```

where `z` is a monadic verb to be applied and `x` is a structure to be indexed with `y`.

```o
o)a:1 2 3; @[a;2;{x+1}]
1 2 4
o)d:`a`b`c!(1 2;3 4;5 6);
o)@[d;`a;{x+10}]
a| 11 12
b| 3 4
c| 5 6
o)t:flip `a`b!(!3;3+!3)
a b
---
0 3
1 4
2 5
o)@[t;`b;{x*3}]
a b
----
0 9
1 12
2 15
o)
```

For inplace modify use variable symbol in the first argument:

```o
o)a:1 2 3; @[`a;2;{x+1}]
`a
o)a
1 2 4
o)
```

::: note
In triadic amend the last argument should be monadic, but some verbs are treated as dyadic. 
Use `:` after the verb to indicate the use of monadic.
:::

```o
o)a: !10
0 1 2 3 4 5 6 7 8 9
o)@[a;2 4 6; -]
** eval error: `amend vec`:
invalid type: [``dyad]
o)@[a;2 4 6; -:]
0 1 -2 3 -4 5 -6 7 8 9
o)
```


::: see
[@ (indexing)](/verbs/indexing/at.md)
[@ (internal type id)](/verbs/type/attype.md)
[@ (tetradic amend)](/verbs/amendsdmends/tetramend.md)
[. (triadic dmend)](/verbs/amendsdmends/trdmend.md)
[. (tetradic dmend)](/verbs/amendsdmends/tetrdmend.md)
:::
