# 0: FileText

Read and write a text file.

**Syntax:** ```x 0: y; 0:[x;y]```

Write list of strings to a file: for left argument use a symbol path to the file.

Read list of strings: left argument is a separator represented with a [regex](/regex.md) string, right argument is a symbol path to the file to be read.

```o
o)`:f.txt 0: ("1,2,3";"4,5,6")
`:f.txt
o)"[,\n]" 0: `:f.txt
"1"
"2"
"3"
"4"
"5"
"6"
""
o)read[`:f.txt]
0x312c322c330a342c352c360a
```






::: see
[Assign 1](/reference/assign/assign1.md)
[read](/verbs/file/read.md)
:::
