# Queries

Relational queries are nice tool to have in a vector language. They form a special sub-language operating on tables somewhat similar to SQL. The term "record" referenced below means a row of fields taken from a table.

::: note
Queries support is currently limited to “select” polyad & "upsert" triad.
:::

## Select

In order to execute a query, one must first define a query expression, compile it into internal representation and apply “fetch” verb to get results. All three stages are done explicitly.

### Overall syntax

Overall syntax for query stages looks like:

```o
q: ?[ t; w; g; f; ot; os ]; // define query
cq: . q; // compile query
res:  fe#cq; // fetch query results
```

… where

**t** is a table-like data source. It might be a table/query/join/union expression.

**w** is a nested list of conditions. It might be an empty list to define no conditions.

**g** is a grouping dict or 0b expression for none.

**f** is a field dict.

**ot** is an optional “take” argument. It might be either a scalar or a two-element integer vector. It defines a range of record indices to limit results.

**os** is an optional “sorting” argument which must be a nested list of fields to sort with direction.

### Compilation & fetching results

Let’s have a look at a simple example first. It just creates a single table, a “q” query, compiles it into “cq” and fetches all table data into “res”.

```o
o)t:(+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;("111";"222";"333"));
o)q:?[ t; (); 0b; `a`b`c`d!`a`b`c`d ];
o)cq:. q;
o)res:0N#cq;
o)res
a b c d
-----------
1 3 6 "111"
2 4 7 "222"
3 5 8 "333"
o)
```

::: note
Note a space between “dot” monad and “q” variable: `cq:. q`
:::

As you can see, the verb “fetch” is a dyad expecting either null to fetch all query results in one go, or an amount of records if positive number.

### Fields/renaming

Fields defined in fourth argument are a dictionary where keys are expected as a symbol vector. Keys define query field names. Dictionary values define fields as symbols or expressions from data source (first argument). To rename query field, just change dictionary keys as appropriate.

```o
o)t:(+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;("111";"222";"333"));
o)q:?[ t; (); 0b; `ra`rb`rc`rd!`a`b`c`d ];
o)cq:. q;
o)res:0N#cq;
o)res
ra rb rc rd
--------------
1  3  6  "111"
2  4  7  "222"
3  5  8  "333"
o)
```

### Table aliases

While field references are unique symbols (e.g. from a single source table), underlying query engine is fine with scalar symbols as fields. However, queries might become too complex if different tables have the same field names. To disambiguate between tables, table aliases are used.

Defining table alias is done via providing a two-element list as a data source instead of a single table. The first element is a symbol defining alias symbol, the second one is a table, join or another data source to bind.

To reference a field via alias, use monadic ```~``` with a two-element symbol vector:

```o
o)t:(+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;("111";"222";"333"));
o)q:?[ (`alias;t); (); 0b; `ra`rb`rc`rd!((~`alias`a);(~`alias`b);(~`alias`c);(~`alias`d)) ];
o)cq:. q;
o)res:0N#cq;
o)res
ra rb rc rd
--------------
1  3  6  "111"
2  4  7  "222"
3  5  8  "333"
o)
```

#### Field expressions

Field definition in queries can also contain various expressions calculated in-flight.

Expressions are defined using functional/"lispy" syntax:

```o
o)t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)0N#.(?[t;();0b;`d`e!((-:;`a);(+;`b;`c))])
d  e
-----
-1 9
-2 11
-3 13
o)
```

#### Virtual field "i"

To identify table rows, use virtual field `` `i``. It's merely an automatically generated zero-based index.

```o
o)t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)0N#.(?[t;();0b;`a`b`c`i!`a`b`c`i])
a b c i
-------
1 3 6 0
2 4 7 1
3 5 8 2
o)
```

#### Constants

Constants can be used in place of field, conditions, etc.

```o
o)t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)0N#.(?[t;();0b;`a`b`c`const!(`a;`b;`c;10)])
a b c const
-----------
1 3 6 10
2 4 7 10
3 5 8 10
o)
```

To distinguish between symbol constants and fields, symbol constants must be enlisted.
```o
o)t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)0N#.(?[t;();0b;`a`b`c`const!(`a;`b;`c;,`d)])
a b c const
-----------
1 3 6 d
2 4 7 d
3 5 8 d
o)
```


### Conditions

Using conditions in queries means leaving only those records that satisfy conditions. If a corresponding field contains an attribute, it will be used to speed-up the query execution.

Here is an example with a single condition filter:

```o
o)t:(+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;("111";"222";"333"));
o)c:,(&lt=;`b;3);
o)0N#.(?[t;c;0b;`a`b`c!`a`b`c])
a b c
-----
1 3 6
o)
```

::: note
List enclosure in “c” definition is mandatory. Condition must be a proper list!
:::

Conditions may contain field expressions:

```o
o)t: (+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)c: ,(&lt=;(+;`b;`c);9);
o)0N#.(?[t;c;0b;`a`b`c!`a`b`c])
a b c
-----
1 3 6
o)
```

#### And/or/not clauses, simplified syntax

Of course, single field conditions are not enough, several conditions are trivially created using `&` and `|` dyads in condition list:

```o
o)sym:`symbol$!10;
o)t:(+:)`a`b`c`d!(1 2 3;`g#`3`4`5;6 7 8;`g#`sym$`3`4`5);
o)c:,(&;(>=;`d;`sym$`3);(&lt=;`b;,`3));
o)0N#.(?[t;c;0b;`a`b`c!`a`b`c])
a b c
-----
1 3 6
o)
```

"not" clause is a bit awkward, as the ordinary `~` monad does not work here. Using `~:` as monadic "not" is not possible because it results in "commute" instead. You need to use a special verb `not`:

```o
o)t:(+:)`a`b`c!(!10;0+!10;`symbol$!10);
o)0N#.(?[t;,(not;(=;`a;6));0b;`a`b`c!`a`b`c])
a b c
-----
0 0 0
1 1 1
2 2 2
3 3 3
4 4 4
5 5 5
7 7 7
8 8 8
9 9 9
o)
```

Quite common pattern is joining all field conditions with “and” logic, thus a simplified syntax is also supported:

```o
o)t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)c:((&lt=;`b;4);(>=;`c;7));
o)0N#.(?[t;c;0b;`a`b`c!`a`b`c])
a b c
-----
2 4 7
o)
```

### Where “subselect”

Another commonly used pattern is a “sub-select”. It applies another (sub-select) query to condition as an argument. It can be used as seen below:

```o
o)t1:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)t2:(+:)`b`c!(,2;,4);
o)c:,(=;`a;?[t2;();0b;(,`b)!(,`b)]);
o)0N#.(?[t1; c; 0b; `a`c!`a`c])
a c
---
2 7
o)
```

Pay attention that just a single scalar value is expected as a result of “t2” query, otherwise an error occurs:

```o
o)t1: (+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)t2:(+:)`b`c!(!2;!2);
o)c: ,(=;`a;?[t2;();0b;(,`b)!(,`b)]);
o)0N#.(?[t1; c; 0b; `a`c!`a`c])
** exec error: select exec: scalar expected
o)
```

### Where “in”

Another predicate accepting sub-selects is `in`. It checks if the left arg is within the right argument set of values (either constant vector or a query).

```o
o)t1:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)t2:(+:)`b`c!(1 2;3 4);
o)c:,(in;`a;?[t2;();0b;(,`b)!(,`b)]);
o)0N#.(?[t1; c; 0b; `a`c!`a`c])
a c
---
1 6
2 7
o)
```

### Where “like”

“Like” predicate matches against a regular expression. Both strings and symbols are supported.

```o
o)t:((+:)`a`d`e`f!(1 2 3;3 4 5;6 7 8;("111";"222";"333")));
o)c:,(like;`a;"111|222");
o)0N#.(?[t; c; 0b; `a`f!`a`f])
a f
-------
1 "111"
2 "222"
o)
```

### Where “match”

“Match” checks for exact equality.

```o
o)t:((+:)`a`d`e`f!(1 2 3;3 4 5;6 7 8;("111";"222";"333")));
o)c: ,(~;`a;"111");
o)0N#.(?[t; c; 0b; `a`f!`a`f])
a f
-------
1 "111"
o)
```

### Where with generic lambda

Any lambda monad/dyad can be used in place of predicate. However, it must satisfy the following requirements.

For monads:

* support vectors as arguments;
* return resulting boolean vector of the argument's length.

```o
o)t:(+:)`a`b`c!(1 2 3;0 0N 5;6 7 8);
o)0N#.(?[t;,(null;`b);0b;(`a`b)!(`a`b)])
a b
----
2 0N
o)
```

For dyads:

* support vectors in the left argument;
* support either vectors or scalars in the right argument (depending on the query predicate third parameter);
* return resulting boolean vector of the left argument's length.

```o
o) t:(+:)`a`b`c!(1 2 3;0 1 5;6 7 8);
o) 0N#.(?[t;,({x>y};`a;`b);0b;(`a`b)!(`a`b)])
a b
---
1 0
2 1
o)
```

## Joins

Joining a pair of tables (or table-likes) is a base operation in queries. Both joining on a single field and on several fields are supported. Usually, table aliases are required to disambiguate fields.

Inner join is defined using the verb `ij`:

```o
o)t1:((+:)`a`b`c!(1 2 3;3 4 5;6 7 8));
o)t2:((+:)`a`d`e`f!(1 2 3;3 4 5;6 7 8;("111";"222";"333")));
o)j: ij[(`t1;t1);(`t2;t2);(~`t1`a;~`t2`a)];
o)0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
a b e f
-----------
1 3 6 "111"
2 4 7 "222"
3 5 8 "333"
o)
```

Inner join is different from the one in SQL - it does not produce Cartesian product for duplicating ids, it emits the first found for second relation.

```o
o)t1:((+:)`a`b`c!(`g#3 2 0;3 4 5;6 7 8));
o)t2:((+:)`a`d`e`f!(`g#2 2 5;13 14 15;16 17 18;("111";"222";"333")));
o)j: ij[(`t1;t1);(`t2;t2);(~`t1`a;~`t2`a)];
o)0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
a b e  f
------------
2 4 16 "111"
o)
```

It’s strongly recommended to attach attributes to a field before the join. If there is no appropriate attribute, query engine will build a temporary one every time the query is executed.

Multi-column joins are also supported. The same logic of building indices beforehand/in-time is applied here.

```o
o)t1:((+:)`a`b`c!(3 1 2;3 4 5;6 7 8));
o)t2:((+:)`a`d`e`f!(1 2 3;4 5 3;16 17 18;("111";"222";"333")));
o)@[`t1;,`a`b;~[#];`g];
o)@[`t2;,`a`d;~[#];`g];
o)j: ij[(`t1;t1);(`t2;t2);((~`t1`a;~`t1`b);(~`t2`a;~`t2`d))];
o)0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
a b e  f
------------
1 4 16 "111"
2 5 17 "222"
3 3 18 "333"
o)
```

Left join is defined using the verb `lj`:

```o
o)t1:((+:)`a`b`c!(3 1 2;3 4 5;6 7 8));
o)t2:((+:)`a`d`e`f!(`g#1 2;13 14;16 17;("111";"222")));
o)j:lj[(`t1;t1);(`t2;t2);(~`t1`a;~`t2`a)];
o)0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
a b e  f
------------
3 3 0N
1 4 16 "111"
2 5 17 "222"
o)
```

Left join differs from the one in SQL as well - it does not produce Cartesian product for duplicating ids, it emits first found for second relation.

```o
o)t1:((+:)`a`b`c!(3 2 0;3 4 5;6 7 8));
o)t2:((+:)`a`d`e`f!(`g#2 2 5;13 14 15;16 17 18;("111";"222";"333")));
o)j:lj[(`t1;t1);(`t2;t2);(~`t1`a;~`t2`a)];
o)0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
a b e  f
------------
3 3 0N
2 4 16 "111"
0 5 0N
o)
```

Just like with `ij`, it’s strongly recommended to attach attributes to a field before the join. If there is no appropriate attribute, query engine will build a temporary one every time the query is executed.

Multi-column left joins are also supported. The same logic of building indices beforehand/in-time is applied here.

```o
o)t1:((+:)`a`b`c!(3 2 0;3 4 5;6 7 8));
o)t2:((+:)`a`b`e`f!(3 2 3;3 4 3;16 17 18;("111";"222";"333")));
o)@[`t2;,`a`d;~[#];`g];
o)j:lj[(`t1;t1);(`t2;t2);((~`t1`a;~`t1`b);(~`t2`a;~`t2`b))];
o)0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
a b e  f
------------
3 3 16 "111"
2 4 17 "222"
0 5 0N
o)
```

## Unions

Union of a pair of tables (or table-likes) is another base operation in queries. Conceptually, it's just lazy "concating" table-likes to get a combined
view.

"Union all" union is defined using the verb `ua`:

```o
o) t1:+`a`b`c!(1 2;3 4;5 6);
o) t2:+`a`b`c!(10 20;30 40;50 60);
o) u:ua[t1;t2];
o) 0N#.(?[u; (); 0b; `a`b`c!`a`b`c])
a  b  c
--------
1  3  5
2  4  6
10 30 50
20 40 60
```

Of course, unioning several table-likes is supported as well:

```o
o) t1:+`a`b`c!(1 2;3 4;5 6);
o) t2:+`a`b`c!(10 20;30 40;50 60);
o) t3:+`a`b`c!(100 200;300 400;500 600);
o) s3:?[t3;();0b;`a`b`c!`a`b`c];
o) u:ua/(t1;t2;s3);
o) 0N#.(?[u; (); 0b; `a`b`c!`a`b`c])
a   b   c
-----------
1   3   5
2   4   6
10  30  50
20  40  60
100 300 500
200 400 600
```

Perhaps unsurprisingly, any other expression accepting table-like works for unions as well. e.g. joining (don't forget aliases):

```o
o) t1:+`a`b`c!(1 2 3;4 5 6;7 8 9);
o) t2:+`a`b`c!(10 20;30 40;50 60);
o) t3:+`a`b`c!(1 10 20;100 300 400;200 500 600);
o) u1:ua[t1;t2];
o) j:ij[(`u1;u1);(`t3;t3);(~`u1`a;~`t3`a)];
o) 0N#.(?[j; (); 0b; `a`b`c!(~`u1`a;~`u1`b;~`t3`c)])
a  b  c
---------
1  4  200
10 30 500
20 40 600
```

## Take range (first, last, between)

Take range is given as the fifth argument for select to limit records fetch by the record index.

To grab the first N records from query results, use a positive scalar:

```o
o) t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) 0N#.(?[t; (); 0b; `a`c!`a`c; 2])
a c
---
1 6
2 7
o)
```

To grab the last N records from query results, use a negative scalar:

```o
o) t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) 0N#.(?[t; (); 0b; `a`c!`a`c; -2])
a c
---
2 7
3 8
o)
```

And to grab records within some range, use a two-element vector (from;length):

```o
o)t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)0N#.(?[t; (); 0b; `a`c!`a`c; 1 2])
a c
---
2 7
3 8
o)
```

To grab all records, use a generic null ```0N0``` or an empty list or a cardinal vector.

```o
o)t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)0N#.(?[t; (); 0b; `a`c!`a`c; 0N0])
a c
---
1 6
2 7
3 8
o)0N#.(?[t; (); 0b; `a`c!`a`c; ()])
a c
---
1 6
2 7
3 8
o)
```

## Select from select

Selecting from inner select is also supported.

```o
o)t1:((+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;8 9 10));
o)t2: ?[(`t1;t1);();0b;`a`b`c!`a`b`c]
o)c: ,(>=;`a;2);
o)0N#.(?[t2; c; 0b; `a`c!`a`c])
a c
---
2 7
3 8
o)
```

## Sorting

Sorting query results is done with the sixth argument in a select. The argument must contain a nested list of fields to sort with direction:

```o
o)t:((+:)`a`b`c!(1 2 3;3 4 5;6 7 8));
o)0N#.(?[t;();0b;`a`c!`a`c;();((>:;`a);(&lt:;`b))])
a c
---
3 8
2 7
1 6
o)
```

Here the monadic `&lt` means ascending order, `>` - the descending one.

## Grouping/aggregation

Grouping fields is done in the third argument. It should be a dict with keys representing resulting field names and values representing source fields. A field dict in the fourth argument plays a different role when grouping dict is present. It defines grouping expressions to apply.

E.g.:

```o
o)t:((+:)`a`b`c`d!(1 2 2;3 4 4;6 7 7;8 9 10));
o)gf: `a`b`c!`a`b`c; // grouping fields
o)ge: (,`d)!(,(sum;`d)); //grouping expressions
o)0N#.(?[t;(); gf; ge])
a b c d
--------
1 3 6 8
2 4 7 19
o)
```

Expressions for group dict values are supported. Conventional functional syntax is used:

```o
o)t:(+:)`a`b`c`d!(1 2 2;3 4 4;6 7 7;8 9 10);
o)gf: `a`b!`a`b; // grouping fields
o)ge: (,`e)!(,(sum;(+;`c;`d))); //grouping expressions
o)0N#.(?[t;(); gf; ge])
a b e
------
1 3 14
2 4 33
o)
```

As for grouping expressions, the following list of monads is currently supported and optimized for performance:

| Exp | Meaning | Description |
| --- | --- | --- |
| #:  | count | number of non-null values in group |
| *: | first | first non-null value in group |
| last | last | last non-null value in group | 
| min | minimum | minimum non-null value in group |
| max | maximum | maximum non-null value in group |
| sum | sum | sum of non-null values in group |
| avg | arithmetic average | average of non-null values in group |

User-defined monads are accepted too but they may lead to slower performance as all intermediate group vectors must be preserved during query processing and a more general approach is used:

```o
o)t:((+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;8 9 10));
o)gf:{+/x};
o)0N#.(?[t;();`a`b`c!`a`b`c;(,`d)!(,(gf;`d))])
a b c d
--------
1 3 6 8
2 4 7 9
3 5 8 10
o)
```

Generic aggregation only (without explicit grouping fields) is done like this:

```o
o)t1:((+:)`a`b`c!(1 2 3 2;3 4 5 6;6 7 8 8));
o)0N#.(?[(`t1;t1);();();`d`e!(({+/x};~`t1`c);({+/x};~`t1`b))])
d  e
-----
29 18
o)
```

Pay attention to an empty list in the third argument that enables aggregation only.

Aggregation only (without explicit grouping fields) using special monads is done like:

```o
o)t:((+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;8 9 10));
o)0N#.(?[(`t1;t1);();0b;`a`b`c`d!((sum;~`t1`a);(avg;~`t1`b);(max;~`t1`c);(min;~`t1`d))])
a b c d
-------
6 4 8 8
o)
```

Getting a distinct/unique set of records is another useful query. See yourself:

```o
o)t:((+:)`a`b`c!(1 2 2 3;3 4 4 5;6 5 5 9));
o)0N#.(?[t;(); 1b; ()])
a b c
-----
1 3 6
2 4 5
3 5 9
o)
```

## Upsert

Triad acts similarly to SQL "UPDATE OR INSERT ..." expression. It also supports creating new fields in addition to updating and inserting existing fields.

First argument is expected to be either a table or a symbol of a table for in-place modification.

Second argument is expected to be a table.

Third argument must be a two-element list of key symbol vectors. Key field vectors must match in length. The first field vector corresponds to the first table, the second one - to the second table.

::: note
It is recommended to have (composite) an index for the keys of the left table. It will speed-up processing.
:::

Let's have a look at some examples:

```o
o)a:(+:)`a`b`c`d!(!10;!10;!10;!10);
o)b:(+:)`a`b`c!(8+!5;8+!5;10+!5);
o)upsert[a;b;(`a`b;`a`b)]
a  b  c  d
-----------
0  0  0  0
1  1  1  1
2  2  2  2
3  3  3  3
4  4  4  4
5  5  5  5
6  6  6  6
7  7  7  7
8  8  10 8
9  9  11 9
10 10 12 0N
11 11 13 0N
12 12 14 0N
o)
```

And in-place modification example:

```o
o)a:(+:)`a`b`c`d!(!10;!10;!10;!10);
o)b:(+:)`a`b`c!(8+!5;8+!5;10+!5);
o)upsert[`a;b;(`a`b;`a`b)]
`a
o)a
a  b  c  d
-----------
0  0  0  0
1  1  1  1
2  2  2  2
3  3  3  3
4  4  4  4
5  5  5  5
6  6  6  6
7  7  7  7
8  8  10 8
9  9  11 9
10 10 12 0N
11 11 13 0N
12 12 14 0N
o)
```

See creating new fields:
```o
o)a:(+:)`a`b`c!(!10;!10;!10); b:(+:)`a`b`c`d`e!(2+!5;2+!5;10+!5;20+!5;5#,"123"); upsert[a;b;(`a`b;`a`b)]
a b c  d  e
---------------
0 0 0  0N 0N0
1 1 1  0N 0N0
2 2 10 20 "123"
3 3 11 21 "123"
4 4 12 22 "123"
5 5 13 23 "123"
6 6 14 24 "123"
7 7 7  0N 0N0
8 8 8  0N 0N0
9 9 9  0N 0N0
o)
```

## Update

TODO

## Delete

TODO

## SQL-like syntax

select [cols] [by groups] from t [where filters]

```o
o)t:(+:)`a`b`c`d!(!10;!10;!10;!10);
o)select [8] M:min a,max b,last d by c from t where c&lt100,c>1
c M x2 x3
---------
2 2 2  2
3 3 3  3
4 4 4  4
5 5 5  5
6 6 6  6
7 7 7  7
8 8 8  8
9 9 9  9
o)
```
