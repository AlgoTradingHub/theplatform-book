# 0: FileText

Reads a text file

**Syntax:** ```x 0: y; 0:[x;y]```

Where left argument is a separator represented with a string, right argument is a symbol path to the file to be read.

```o
o)0:["\n";`:f.txt]
"1,2,3"
"4,5,6"
o)
```

::: see
[Assign 1](/reference/assign/assign1.md)
:::
