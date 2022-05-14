# eval

Evaluates parse trees.

**Syntax:** ```eval x; eval[x]```

```o
o)eval(+;1;1)
2
o)d:parse "`a`b!(1 2)"
!
`a`b
1 2
o)eval d
a| 1
b| 2
o)d1:parse "3*`a`b!(1 2)"
*
3
(!;`a`b;1 2)
o)eval d1
a| 3
b| 6
o)
```

::: see
[parse](/verbs/string/parse.md)
:::
