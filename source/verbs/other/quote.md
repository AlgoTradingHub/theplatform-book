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

::: warn
Be careful with local symbols when using ```quote```. If the lambda returns the result of ```quote```, it is better to perform an unquote ```::``` for symbol.
:::

```o
o)a:1; q:quote a+2
+
`a
2
o){a:1; q:quote a+2}[]
+
#1
2
o){b:40; eval {a:1; q:quote a+2}[] }[]
42
o){b:40; eval {a:1; q:quote (::a)+2}[] }[]
3
o)
```


::: see
[eval](/verbs/concurrency/eval.md)
[parse](/verbs/string/parse.md)
:::
