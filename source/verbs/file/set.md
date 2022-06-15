# set

Sets global variable or persists in a file.

**Syntax:** ```x set y; set[x;y]```

```o
o)`x set 100
100
o){set[`a;1]}[];
o)a
1
o)t:+`a`s!(1 2;3 4)
a s
---
1 3
2 4
o)`:/tmp/db/ set t
`:/tmp/db/
o)
```

::: warn
Please pay attention to trailing slash at the end of the path symbol. That defines saving table as a splayed table.
Currently only splayed tables can be saved on disk. For detail see [table on disk](/reference/types/tables/ondisk.md).
:::


::: see
[get](/verbs/file/get.md)
:::
