# get

Reads AST vаlue from a file specified in `x` as a symbol.

**Syntax:** ```get x; get[x]```

```o
o)t:+`a`s`d!(1 2 3;4 5 6;7 8 9)
a s d
-----
1 4 7
2 5 8
3 6 9
o)`:db/ set t
`:db/
o)get `:db/
a s d
-----
1 4 7
2 5 8
3 6 9
o)
```

::: warn
Please pay attention to trailing slash at the end of the path symbol. That defines saving table as a splayed table.
Currently only splayed tables can be saved on disk. For detail see [table on disk](/reference/types/tables/ondisk.md).
:::


::: see
[set](/verbs/file/set.md)
:::
