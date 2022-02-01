# 0: FileText

Reads a text file

**Syntax:** ```x 0: y; 0:[x;y]```

Where left argument is a separator represented with a string, right argument is a symbol path to the file to be read.

```o
o)write["1,2,3\n4,5,6";`:f.txt];
o)0:["\n";`:f.txt]
"1,2,3"
"4,5,6"
o)read[`:f.txt]
0x312c322c330a342c352c36
```

::: see
[Assign 1](/reference/assign/assign1.md)
[read](/verbs/file/read.md)
[write](/verbs/file/write.md)
:::
