# Attributes

Attribute is an optional piece of information describing vector property.

E.g. sorted attribute can speed up search, join and other verbs.

::: note
Once an attribute is attached to vector, it cannot be removed by amend/dmend.
:::

Attaching an attribute is done using **#** dyad with left argument being a predefined symbol.

| Type | Attr symbol |
| --- | --- |
| Ascending sort | \`s or \`asc |
| Descending sort | \`desc |
| Search index | \`g |

## Sorted attribute

When attached to vector, sorted attribute ensures vector is sorted. Both ascending and descending sorts are supported. When sorted attribute is present, binary search algorithm is used instead of linear scan.

```o
o)a: `s#1 2 3
`asc#1 2 3
o)a: `asc#1 2 3
`asc#1 2 3
o)a: `desc#3 2 1
`desc#3 2 1
o)
```

One-element vector and empty vectors:

```o
o)a: `s#`long$()
`asc#`long$()
o)a: `s#,1
`asc#,1
o)a: `desc#`long$()
`desc#`long$()
```

Attaching sorted attribute to an unsorted vector will result in an error:

```o
o) a: `s#3 2 1
** runtime error: `attribute`:
not sorted
o)
```

## Search index attribute `g

When attached to vector, seach index attribute creates a separate search index structure which uses additional memory. With search index attribute, search algorithm is used instead of linear scan.

There are no specific requirements for vector contents.

```o
o)a: `g#til 10
`g#0 1 2 3 4 5 6 7 8 9
o)
```

## Existing value modification

Destructively attaching an attribute to an existing vector:

```o
o)a: 1 2 3
1 2 3
o).[`a;();{`s#x}]
`a
o)a
`asc#1 2 3
o)
```

Destructively removing an attribute from an existing vector:

```o
o)a: `s#1 2 3
`asc#1 2 3
o).[`a;();{`#x}]
`a
o) a
1 2 3
o)
```

Before modifying a vector, interpreter checks it for an attribute at runtime:

```o
o)a: `s#1 2 3;
o)@[a;0;:;3]
** runtime error: `attributes`:
attr violation
o)
```

## Multi-column attributes/indices

Attributes defined on several table fields are useful for search and query joins. Thus, attributes are defined not on fields/vectors, but on tables themselves. In line with simple attributes, all mutable verbs preserve attributes state consistency. It means that trying to mutate a table in an incompatible way with the index results in a runtime error. E.g., only append and update are supported.

Currently, a single attribute type supported is \`g based on tree index.

There are two different ways to define multi-column indices/attributes. To create an immutable attribute, use the **#** dyad:

```o
o)a:(+:)`a`b`c!(!5;!5;!5); b:`g#(2!a);
o)b
a b c
-----
0 0 0
1 1 1
2 2 2
3 3 3
4 4 4
o)meta b
+`column`type`id!(`a`b`c;`long`long`long;45376 45376 45376)
(`a`b)
o)
```

::: note
"meta" verb can be used to see which table indices are present.
:::

Mutable attribute build is done via [@ tetrad](/verbs/amendsdmends/tetramend.md) with an enclosed symbol vector in the second argument:

```o
o)a:(+:)`a`b`c!(!5;!5;!5); @[`a;,`a`b`c;~[#];`g]; meta a
+`column`type`id!(`a`b`c;`long`long`long;45376 45376 45376)
(`a`b`c)
```

In either way, "find" verb will use an attribute/index with appropriate fields automatically.

```o
o)a:(+:)`a`b`c!(!10;!10;!10);
o)@[`a;,`a`b`c;~[#];`g];
o)(!10)~a?(+:)`a`c`b!(!10;!10;!10)
1b
o)
```

To drop an index, use a null symbol in amend:

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); @[`a;,`a`b;~[#];`g];
o)meta a
+`column`type`id!(`a`b`c;`long`long`long;45376 45376 45376)
(`a`b)
o)@[`a;,`a`b;~[#];`];
o)meta a
+`column`type`id!(`a`b`c;`long`long`long;45376 45376 45376)
()
```

## Multi-column index on disk

Multi-column indices on disk are fully supported. See index on disk with enums:

```o
o)sym:`symbol$!5;
o)fsym:`:/tmp/midx/o_sym_midx.dat; fsym set sym;
o)a:(+:)`a`b`c!(`sym$`symbol$!5;10+!5;20+!5);
o)@[`a;,`a`b`c;~[#];`g];
o)f:`:/tmp/midx/; f set a;
o)b:get f; sym: get fsym; // read all data from disk
o)@[`b;`a;~[$];`sym]; // attach symbol for enums
o) a~b
1b
o)
```

Example with index read on demand off the disk:

```o
o)sym:`symbol$!15;
o)fsym:`:/tmp/midx/o_sym_midx.dat; fsym set sym;
o)a:(+:)`a`b`c!(`sym$`symbol$!5;`sym$`symbol$10+!5;20+!5);
o)@[`a;,`a`b`c;~[#];`g];
o)f:`:/tmp/midx/; f set a; // save an entire table with index on disk
o)load f; // read table with index into workspace
o)@[`midx;`a`b;~[$];`sym];
o)midx?(+:)`a`b`c!(`sym$`symbol$2 3;`sym$`symbol$12 13;22 23)
2 3
o)
```

::: see
[# (count)](/verbs/math/count.md)
[# (take)](/verbs/list/take.md)
:::
