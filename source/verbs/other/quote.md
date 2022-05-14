# quote

Returns `x` unevaluated.

**Syntax:** ```quote x; quote[x]```

```o
o)quote 1+2
+
1
2
o)quote `a`b!(1;2)
!
`a`b
(,;1;2)
o)
```

To evaluate the result of `quote`, use `eval`:

```o
o)a:quote 1+2
+
1
2
o)eval a
3
o)b:quote `a`b!(1;2)
!
`a`b
(,;1;2)
o)eval b
a| 1
b| 2
o)
```

::: see
[eval](/verbs/concurrency/eval.md)
[parse](/verbs/string/parse.md)
:::
