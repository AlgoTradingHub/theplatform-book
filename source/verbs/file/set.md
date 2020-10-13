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

::: see
[get](/verbs/file/get.md)
:::
