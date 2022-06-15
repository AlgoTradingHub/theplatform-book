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

::: see
<<< prev [Creation](/reference/types/tables/creation.md)
next >>> [Meta information](/reference/types/tables/meta.md)
:::
