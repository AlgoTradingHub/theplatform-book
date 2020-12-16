# Tables

A table is similar to a dict and represents relational tables. Keys as column names correspond to values as simple vectors/sequences.

## Table creation

Syntax for creating tables at parse time is:

```o
o)([]a:1 2 3;b:4 5 6;c:7 8 9)
a b c
-----
1 4 7
2 5 8
3 6 9
o)
```

Only constant expressions for field vectors are allowed.

Another way to create a table is flipping a dictionary:

```o
o)(+:)`a`b`c!(1 2 3;4 5 6;7 8 9)
a b c
-----
1 4 7
2 5 8
3 6 9
o)
```

For compatibility with Q, the "flip" verb is also supported.

```o
o)flip `a`b`c!(1 2 3;4 5 6;7 8 9)
a b c
-----
1 4 7
2 5 8
3 6 9
o)
```

::: warn
Important! Observation here is that flipping the dictionary is a constant time operation. Technically, it's a new "table" type structure created with references to dictionary contents.
:::

## Table indexing

Indexing with an integer scalar returns a dictionary of values at corresponding "record" position:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a[1]
a| 2
b| 2
c| 2
o)
```

... while indexing with an integer vector returns a table of records at positions:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a[2 1 0]
a b c
-----
3 3 3
2 2 2
1 1 1
o)
```

## Table meta-information

To get table fields, use monadic `!` verb:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); !a
`a`b`c
o)
```

Asking for table "values" results in a list of table vectors:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); value a
1 2 3
1 2 3
1 2 3
o)
```

Every table can be queried for its length - the amount of "records" it contains:

```o
o)a:(+:)`a`b`c!(1 2 3 4;1 2 3 4;1 2 3 4); #a
4
o)
```

Designated `meta` verb returns column names, types and internal typed ids for a table:

```o
o)meta (+:)`a`b`c!(1 2 3)
+`column`type`id!(`a`b`c;`long`long`long;45376 45376 45376)
()
o)
```

## Arithmetics on tables

Applying arithmetic verbs on tables results in expected behaviour:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a+1
a b c
-----
2 2 2
3 3 3
4 4 4
o)
```

Adding vector to a table gives per field addition.

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a+1 2 3
a b c
-----
2 3 4
3 4 5
4 5 6
o)
```

Adding two tables keeps the record count:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a+a
a b c
-----
2 2 2
4 4 4
6 6 6
o)
```

## Table modification

Table amend/dmend work mostly the same as for dictionaries. Following example increases the "b" field by 1 for records at positions 0 and 2.

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); .[a;(`b;0 2);+;1]
a b c
-----
1 2 1
2 2 2
3 4 3
o)
```

To create a new integer field of ones, do:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); @[a;`d;:;1]
a b c d
-------
1 1 1 1
2 2 2 1
3 3 3 1
o)
```

You can also combine primitive function application with creating a new field:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); @[a;`a`b`d;+;1]
a b c d
-------
2 2 1 1
3 3 2 1
4 4 3 1
o)
```

Multiplication also works:

```o
o)a:(+:)(,`a)!,(1 2 3); @[a;`a`b;*;2]
a b
---
2 2
4 2
6 2
o)
```

::: note
You can see that the "initial" value for addition and multiplication is different.
Indeed, assign/plus/minus dyads assume zero value as initial, mul/div take one for initial.
:::

... however, the following code won't work, as interpreter does not try to analyze lambda result types.

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); @[a;`a`b`d;{x+y};1]
** exec error: amend: type
```

More complex example shows creating of a new field and vector addition as single amend expression:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); @[a;`a`b`d;+;(4 4 4;1;2)]
a b c d
-------
5 2 1 2
6 3 2 2
7 4 3 2
o)
```

## Table inserts

Table insert is a main operation for appending new records to tables.
Both destructive and functional inserts are done using "concat" verb.

Single record insert/append. See yourself:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a,(1 2 3)
a b c
-----
1 1 1
2 2 2
3 3 3
1 2 3
o)
```

Append with scalars extended:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a,(1 2 3)
a b c
-----
1 1 1
2 2 2
3 3 3
1 2 3
o)
```

And inserting via dictionary having same fields:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a,`c`b`a!(1 2 3)
a b c
-----
1 1 1
2 2 2
3 3 3
3 2 1
o)
```

Obviously, just as with dicts, concatenating tables works fine:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a,a
a b c
-----
1 1 1
2 2 2
3 3 3
1 1 1
2 2 2
3 3 3
o)
```

Appending records is as simple as:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); .[`a;();,;(10;20;30)]
`a
o)a
a  b  c
--------
1  1  1
2  2  2
3  3  3
10 20 30
o)
```

Or using shorter syntax:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a,:(10;20;30)
`a
o)a
a  b  c
--------
1  1  1
2  2  2
3  3  3
10 20 30
o)
```

## Tables on disk

Currently only splayed tables can be saved on disk.

"Splayed table" in O means just the same as in Q/KDB - saving each field vector in a separate continuous file capable of mmapping it.

"Mmapping" allows to avoid loading all table contents in memory in one go, but to work with a table off the disk (by using OS memory-mapped files technique).

Saving table values to disk is pretty simple. Just choose directory to keep your table files and execute something similar to:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:/tmp/o_table/; f set a;
```

::: warn
Important! Please pay attention to trailing slash at the end of the path symbol. That defines saving table as a splayed table.
:::

Doing that creates ``/tmp/o_table`` directory filled with files named ".d", "a", "b" and "c".
These files corresponding to fields and the ".d" file which contains symbol vector \`a\`b\`c to keep the field order of the table.

Please pay attention that only fields mentioned in ".d" file are considered as table fields. Thus even if files are in the table directory, but not in the  ".d" file, they will be ignored.

Use "get" function to load table contents:

```o
o)f:`:/tmp/o_table/; get f
a b c
-----
1 1 1
2 2 2
3 3 3
o)
```

::: note
Getting table contents results in a separate/full copy in memory. That is modifying loaded table does not influence the copy on disk in any way.
:::

### On-disk table modifications

Modifying table on disk can be done in two ways:

1. Amending via a path symbol.
2. Opening table in workspace.

Amending via a path symbol is useful e.g. for adding a new field.

```o
// creating test table
a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:/tmp/o_table2/; f set a; a:0;
// append two new fields
@[f;`e`d;:;(3#1;3#2)];
// modify .d file to record new fields
.[`:/tmp/o_table2/.d;();,;`e`d];
```

Appending records via path symbol is ok.

```o
a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:/tmp/o_table3/; f set a; a:0;
// appending one record
.[f;();,;(10;20;30)];
// appending two records
.[f;();,;(10 10;20 20;30 30)];
```

Opening table in workspace works by binding global variable to table mmapped on disk.

```o
// create new table on disk
a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:/tmp/odb1/; f set a; a:0;
// load it to workspace. Now odb1 global variable contains a writable reference
load f;
// append new record
.[`odb1;();,;(10;20;30)];
// ... or via short syntax
o)odb1,:(10;20;30)
// see contents
o)odb1
a  b  c
--------
1  1  1
2  2  2
3  3  3
10 20 30
10 20 30
// close table, saving pending changes
odb1:0;
o)
```
