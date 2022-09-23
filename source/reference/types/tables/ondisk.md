## Tables on disk

Currently only splayed tables can be saved on disk.

"Splayed table" in O means just the same as in Q/KDB - saving each field vector in a separate continuous file capable of mmapping it.

"Mmapping" allows to avoid loading all table contents in memory in one go, but to work with a table off the disk (by using OS memory-mapped files technique).

### Supported field types

Only following field types are supported in splayed tables:
1. Vectors excluding symbol vectors.
2. Compound lists - lists containing primitive scalars (all scalars except GUIDs) and/or vectors excluding symbols vectors. Nested lists are not supported.

::: note
Convert symbol vectors into enum vectors first to be able to save them in splayed table. You can use ```.o.en``` function for that.
:::

### Saving on disk

Saving table values to disk is pretty simple. Just choose directory to keep your table files and execute something similar to:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:/tmp/o_table/; f set a;
o)
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
o)// creating test table
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:/tmp/o_table2/; f set a; a:0;
o)// append two new fields
o)@[f;`e`d;:;(3#1;3#2)];
o)// modify .d file to record new fields
o).[`:/tmp/o_table2/.d;();,;`e`d];
```

Appending records via path symbol is ok.

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:/tmp/o_table3/; f set a; a:0;
o)// appending one record
o).[f;();,;(10;20;30)];
o)// appending two records
o).[f;();,;(10 10;20 20;30 30)];
```

Opening table in workspace works by binding global variable to table mmapped on disk.

```o
o)// create new table on disk
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:/tmp/odb1/; f set a; a:0;
o)// load it to workspace. Now odb1 global variable contains a writable reference
o)load f;
o)// append new record
o).[`odb1;();,;(10;20;30)];
o)// ... or via short syntax
o)odb1,:(10;20;30);
o)// see contents
o)odb1
a  b  c
--------
1  1  1
2  2  2
3  3  3
10 20 30
10 20 30
o)// close table, saving pending changes
o)odb1:0;
o)
```

::: see
<<< prev [Inserts](/reference/types/tables/inserts.md)
[Reading/writing concept](/verbs/databaseio/readingwriting.md)
[Projecting files concept](/verbs/databaseio/projecting.md)
:::
