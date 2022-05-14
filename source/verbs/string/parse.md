# parse

Parses `x` to an AST (abstract syntax tree).

**Syntax:** ```parse x; parse[x]```

```o
o)parse "1+2"
+
1
2
o)parse "`a`b!(1;2)"
!
`a`b
(,;1;2)
o)parse "1 2 3 +neg 5 1 7"
+
1 2 3
((-:);5 1 7)
o)
```

Execute a parse tree with `eval`:

```o
o)x:parse "1 2 3 + 3 4 5"
+
1 2 3
3 4 5
o)eval x
4 6 8
o)
```

::: see
[eval](/verbs/concurrency/eval.md)
[quote](/verbs/other/quote.md)
:::
