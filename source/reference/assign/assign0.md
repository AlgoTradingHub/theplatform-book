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

## CSV

With 0: we can work with csv files. First of all you must prepare the table columns as formatted text.

In this use, 0: has as left operand a char delimiter and as right operand a table.

```o
o)t:+`a`b`c!(1 2;3 4;5 6);
o)f:"," 0: t
"a,b,c"
"1,3,5"
"2,4,6"
o)`:t.csv 0: f;
o)
```

To read csv file need define types of columns and char delimiter.

```o
o)tbl:("JJJ"; enlist ",") 0: `:t.csv
a b c
-----
1 3 5
2 4 6
o)
```

Delimiter char must be enlisted when the first record of the file contain column names.

```o
o)`:tt.csv 0: ("1,2,3";"4,5,6");
o)+`aa`bb`cc!("JJJ";",") 0: `:tt.csv
aa bb cc
--------
1  2  3
4  5  6
o)
```

Example with module "core" for file with column names:

```o
o)load "core"
o)t:flip  `aa`bb`cc!(1 2 3;`a`b`c;("r0";"r1";"r2"));
o)wcsv[t;!t;",";`:t.csv];
o)rcsv[();",";"JSc";`:t.csv]
aa bb cc
----------
1  a  "r0"
2  b  "r1"
3  c  "r2"
o)
```

Example with module "core" for file without column names:

```o
o)load "core"
o)t:flip  `aa`bb`cc!(1 2 3;`a`b`c;("r0";"r1";"r2"));
o)cols:!t;
o)wcsv[t;();",";`:tt.csv];
o)rcsv[cols;",";"JSc";`:tt.csv]
aa bb cc
----------
1  a  "r0"
2  b  "r1"
3  c  "r2"
o)
```

::: see
[Assign 1](/reference/assign/assign1.md)
[read](/verbs/file/read.md)
[repr](/verbs/casts/repr.md)
:::
