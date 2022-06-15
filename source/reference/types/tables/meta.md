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

::: see
<<< prev  [Indexing](/reference/types/tables/indexing.md)
next >>>  [Arithmetics](/reference/types/tables/arithmetic.md)
:::
