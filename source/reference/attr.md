# Attributes

Attribute is an optional piece of information describing optional vector property.

e.g. sorted attribute can lead to faster search, join, and other verbs.

_Important note - once attribute attached, it cannot be lost by amend/dmend._

Attaching attribute is done using **#** dyad using left arg being a predefined symbol.

| Type | Attr symbol |
| --- | --- |
| Ascending sort | \`s or \`asc |
| Descending sort | \`desc |
| Search index | \`g |

## Sorted attribute

When attached to vector, it ensures vector is sorted. Both ascending and descending sort is supported.
For searching binary search algorithm is used instead of linear scan.

```o
o) a: `s#1 2 3
`asc#1 2 3
o) a: `asc#1 2 3
`asc#1 2 3
o) a: `desc#3 2 1
`desc#1 2 3
```

One-element vector and empty vectors:

```o
o) a: `s#`long$()
`asc#`long$()

o) a: `s#,1
`asc#,1

o) a: `desc#`long$()
`desc#`long$()
```

Asking to attach sorted attribute to an unsorted vector will result in an error:

```o
o) a: `s#3 2 1
** exec error: attr: not sorted
```

## Search index attribute

When attached to vector, it creates a separate search index structure. Thus it requires additional memory to keep it.
For searching index search algorithm is used instead of linear scan.

No specific requirements for vector contents exist. However, vector with indices like that do not support every verb.
e.g. "drop", "insert", etc. will raise error.

```o
o) a:`g#1 2 3
`g#1 2 3
o) .[`a;();_;2]
** exec error: attr: attr violation.
```

## Existing value modification

Destructively attach attribute to existing vector:

```o
o) a: 1 2 3
o) .[`a;();{`s#x}]
`a
o) a
`asc#1 2 3
```

Destructively remove attribute from existing vector:

```o
o) a: `s#1 2 3
o) .[`a;();{`#x}]
`a
o) a
1 2 3
```

Modifying attributed vector is checked at runtime:

```o
o) a: `s#1 2 3
o) @[a;0;:;3]
** exec error: attr: attr violation.
```

## Multi-column attributes / indices

Attributes defined on several table fields is useful for search and query joins. Thus attributes are defined not on fields / vectors, but on tables themselves. In line with simple attributes, all mutable verbs preserve attributes state consistency. It means that trying to mutate table in incompatible way with index results in runtime error. E.g. only append and update are supported.

Currently only one single attribute type is supported \`g based on tree index.

There are two different ways of defining multi-column indices / attributes. Immutable attribute creation is done using ordinary way via **#** dyad:

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
column type id
----------------
a      long 2128
b      long 2128
c      long 2128
(`a`b)
```

::: note
"meta" verb can be used to see which table indices are there.
:::

Mutable attribute build is done via **@** tetrad with second argument being enclosed symbol vector:

```o
o)a:(+:)`a`b`c!(!5;!5;!5); @[`a;,`a`b`c;~#;`g]; meta a
column type id
----------------
a      long 2128
b      long 2128
c      long 2128
(`a`b`c)
```

In either way, “find” verb will use attribute/index with appropriate fields automatically.

```o
o)a:(+:)`a`b`c!(!10;!10;!10);
o)@[`a;,`a`b`c;~#;`g];
o)(!10)~a?(+:)`a`c`b!(!10;!10;!10)
1b
```

Dropping index is done using null symbol in amend:

```o
o) a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); @[`a;,`a`b;~#;`g];
o) meta a
+`column`type`id!(`a`b`c;`long`long`long;22688 22688 22688)
(`a`b)
o) @[`a;,`a`b;~#;`];
o) meta a
+`column`type`id!(`a`b`c;`long`long`long;22688 22688 22688)
()
```

## Multi-column index on disk

Multi-column indices on disk are fully supported. See index on disk with enums:

```o
o) sym:`symbol$!5;
o) fsym:`:/tmp/midx/o_sym_midx.dat; fsym set sym;
o) a:(+:)`a`b`c!(`sym$`symbol$!5;10+!5;20+!5);
o) @[`a;,`a`b`c;~#;`g];
o) f:`:/tmp/midx/; f set a;
o) b:get f; sym: get fsym; // read all data from disk
o) @[`b;`a;~$;`sym]; // attach symbol for enums
o)  a~b
1b
```

Example with index read on demand off the disk:

```o
o) sym:`symbol$!15;
o) fsym:`:/tmp/midx/o_sym_midx.dat; fsym set sym;
o) a:(+:)`a`b`c!(`sym$`symbol$!5;`sym$`symbol$10+!5;20+!5);
o) @[`a;,`a`b`c;~#;`g];
o) f:`:/tmp/midx/; f set a; // save entire table with index on disk
o) load f; // read table with index into workspace
o) @[`midx;`a`b;~$;`sym];
o) midx?(+:)`a`b`c!(`sym$`symbol$12 13;`sym$`symbol$2 3;22 23)
2 3
```
