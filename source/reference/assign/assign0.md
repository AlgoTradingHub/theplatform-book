# 0: FileText

Read text file, applying separator as left argument

**Syntax:** ```x 0: y; 0:[x;y]```

Where left argument is string, right argument is a symbol path to the file to be readed

```o
o)0:["\n";`:f.txt]
"1,2,3"
"4,5,6"
o)
```
