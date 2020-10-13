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
o)
```
See also `eval` // to be added
