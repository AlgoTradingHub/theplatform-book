# Tables

A table is mostly similar to dict type and represents relational tables.
Keys as fields correspond to values as simple vectors/sequences.

## Table creation

Syntax for creating tables at parse time is:

```o
o)([]a:1 2 3;b:4 5 6;c:7 8 9)
a b c
-----
1 4 7
2 5 8
3 6 9
```

Only constant expressions for field vectors are allowed.

Another way of creating tables is flipping a dictionary, like following:

```o
o)(+:)`a`b`c!(1 2 3;4 5 6;7 8 9)
a b c
-----
1 4 7
2 5 8
3 6 9
```

For compatibility with Q "flip" verb is also supported.

```o
o)flip `a`b`c!(1 2 3;4 5 6;7 8 9)
a b c
-----
1 4 7
2 5 8
3 6 9
```

::: warn
Important! Observation here is that flipping the dictionary is constant time operation. Technically only new "table" type structure created with references to dictionary contents.
:::

## Table indexing

Indexing a table using integer scalar gives dictionary of values at corresponding "record" position:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a[1]
a| 2
b| 2
c| 2
```

... while indexing using integer vector gives table consisting of records at positions.

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a[2 1 0]
a b c
-----
3 3 3
2 2 2
1 1 1
```

## Table meta-information

To get table fields, one can use monadic "!" verb:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); !a
`a`b`c
```

Asking for table "values" results in a list of table vectors:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); value a
1 2 3
1 2 3
1 2 3
```

Every table can be queried for its length, that is amount of "records" table consists of:

```o
o)a:(+:)`a`b`c!(1 2 3 4;1 2 3 4;1 2 3 4); #a
4
```

## Arithmetics on tables

Applying arithmetic verbs on tables gives expected behaviour:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a+1
a b c
-----
2 2 2
3 3 3
4 4 4
```

Adding vector to a table gives per field addition.

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a+1 2 3
a b c
-----
2 3 4
3 4 5
4 5 6
```

Adding two tables keeps record count:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a+a
a b c
-----
2 2 2
4 4 4
6 6 6
```

## Table modification

Table amend/dmend work mostly the same as for dictionaries.
Following example increases "b" field by 1 for records at positions 0 and 2.

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); .[a;(`b;0 2);+;1]
a b c
-----
1 2 1
2 2 2
3 4 3
```

To create a new integer field filled ones, do:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); @[a;`d;:;1]
a b c d
-------
1 1 1 1
2 2 2 1
3 3 3 1
```

Combining primitive function application with new field creating also works:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); @[a;`a`b`d;+;1]
a b c d
-------
2 2 1 1
3 3 2 1
4 4 3 1
```

Multiplication also works:

```o
o)a:(+:)(,`a)!,(1 2 3); @[a;`a`b;*;2]
a b
---
2 2
4 2
6 2
```

One can see that "initial" value for both dyad (addition and multiplication) is different.
Indeed, assign/plus/minus dyads assume zero value as initial, mul/div - one as initial.

... however, following code won't work as interpreter does not try to analyze lambda result types.

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); @[a;`a`b`d;{x+y};1]
** exec error: amend: type
```

More complex example show both new field creation and vector addition as single amend expression:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); @[a;`a`b`d;+;(4 4 4;1;2)]
a b c d
-------
5 2 1 2
6 3 2 2
7 4 3 2
```

## Table inserts

Table inserts are main operation for appending new records to tables.
Both destructive and functional insert are done using "concat" verb.

Single record insert/append. See yourself:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a,(1 2 3)
a b c
-----
1 1 1
2 2 2
3 3 3
1 2 3
```

Append with scalars extend:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); a,(1 2 3)
a b c
-----
1 1 1
2 2 2
3 3 3
1 2 3
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
```

## Tables on disk

Currently only splayed tables can be saved on disk.

Splayed table means the same as for Q/KDB - saving each field vector in a separate continuous file capable of mmapping it.

"Mmapping" allows to avoid loading all table contents in memory in one go, but working with table off the disk (by using OS memory-mapped files technique).

Saving table value to disk is pretty simple. Just choose directory for keeping your table files and execute something similar to:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:/tmp/o_table/; f set a;
```

::: warn
Important! Please pay attention to trailing slash in path symbol. That defines saving table as splayed table.
:::

Doing that creates ``/tmp/o_table`` directory filled with files named ".d", "a", "b" and "c".
That is all fields to directly to corresponding files. And ".d" file contains symbol vector \`a\`b\`c for keeping table field order.

Please pay attention that only fields mentioned in ".d" file are considered as table fields. Thus even if files will reside in table directory, but not in ".d" file, they will be ignored.

"get" function can be used to load table contents:

```o
o)f:`:/tmp/o_table/; get f
a b c
-----
1 1 1
2 2 2
3 3 3
```

One thing worth noting here is that getting table contents results in separate/full copy in memory. That is modifying loaded table does not influence on-disk copy in any way.

### On-disk table modifications

Modifying table on disk can be done using two ways:

1. Amending via path symbol
2. Opening table in workspace.

Amending via path symbol is useful e.g. for adding new field.

```o
// creating test table
a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:/tmp/o_table2/; f set a; a:0;
// append two new fields
@[f;`e`d;:;(3#1;3#2)];
// modify .d file to record new fields
@[f;`.d;,;`e`d];
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
```
