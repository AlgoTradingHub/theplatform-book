# write

Writes a string or a byte vector to a file.

**Syntax:** ```x write y; write[x;y]```

```o
o)"aaa" write `:/tmp/t.txt
`:/tmp/t.txt
o)0x010203010203aff write `:/tmp/t.txt
`:/tmp/t.txt
o)
```

::: see
[read](/verbs/file/read.md)
:::
