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

::: see
<<< prev [Meta information](/reference/types/tables/meta.md)
next >>> [Modification](/reference/types/tables/modification.md)
:::
