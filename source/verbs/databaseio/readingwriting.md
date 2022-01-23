# Reading/writing concept

Database persistance is an important O feature. Conceptually, there are two kinds of persistance in O language - reading/writing entire files from/to disk and projecting vectors/tables directly from disk.

The first kind is easier and more powerful as it supports more O types.
The second kind is often faster and more memory-efficient, but supports only a subset of O structures - vectors of simple/fixed types, dictionaries and tables.

Reading and writing are done using ```get``` and ```set``` verbs.

**Syntax:** ```x set y; set[x;y]```

where `x` is a symbolic file handle (a symbol starting with ":", followed by directory and ending with filename + extension) and `y` is an item to be written.

**Syntax:** ```get x; get[x]```

where `x` is a symbolic file handle.

The simplest example is generating a vector and saving it to disk via ```set``` dyad. Later we can read it.
```o
o)a:!10; f:`:./tmp/test.dat; f set a;
o)b:get f
o)b
0 1 2 3 4 5 6 7 8 9
o)
```

::: note
Remember - `set` verb changes its behaviour based on format of its left argument.
:::

The same idea goes for complex/nested list.
```o
o) a:(!10; "123"; `symbol; `a`b`c!1 2 3); f:`:./tmp/test.dat; f set a;
o) b:get f;
o) b
0 1 2 3 4 5 6 7 8 9
"123"
`symbol
`a`b`c!1 2 3
o)
```
