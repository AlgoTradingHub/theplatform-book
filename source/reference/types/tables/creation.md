# Tables

A table is similar to a dict and represents relational tables. Keys as column names correspond to vаlues as simple vectors/sequences.

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

::: note
Observation here is that flipping the dictionary is a constant time operation. 
Technically, it's a new "table" type structure created with references to dictionary contents.
:::


::: see
[Dictionaries](/reference/types/dicts.md)
next >>> [Indexing](/reference/types/tables/indexing.md)
:::
