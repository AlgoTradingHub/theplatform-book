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

::: see
<<< prev [Modification](/reference/types/tables/modification.md)
next >>> [On disk](/reference/types/tables/ondisk.md)
:::
