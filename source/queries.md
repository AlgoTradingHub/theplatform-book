# Queries

Relational queries are nice tool to have in vector language.
They form a special sub-language operating on tables somewhat similar to SQL.
“Record” term referenced below will mean a row of fields taken from table.

_Queries support is currently limited to “select” polyad & "upsert" triad._

## Select

In order to execute a query, one must first define query expression, compile it into internal representation and apply “fetch” verb to get results. All three stages are done explicitly.

### Overall syntax

Overall syntax for query stages looks like:

```o
q: ?[ t; w; g; f; ot; os ]; // define query
cq: . q; // compile query
res:  fe#cq; // fetch query results
```

… where

**t** - table-like data source. It might be table/query/join expression.

**w** - nested list of conditions. It might be empty list to define no conditions.

**g** - grouping dict or 0b expression for none

**f**  - field dict

**ot** - optional “take” argument. It might be either scalar or 2-element integer vector. Defines range of record indices to limit results to.

**os** - optional “sorting” argument, which must be nested list of fields with sort on with direction.

### Compilation & fetching results

Let’s see some simplest example first. It just creates a single table, creates query “q”, compiles it into “cq” and fetches all table data into “res”.

```o
o) t: (+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;("111";"222";"333"))
o) q: ?[ t; (); 0b; `a`b`c`d!`a`b`c`d ];
o) cq: . q;
o) res: 0N#cq;
o) res
a b c d
-----------
1 3 6 "111"
2 4 7 "222"
3 5 8 "333"
```

_Note a space between “dot” monad and “q” variable._

As seen “fetch” verb is dyad expecting either null for fetching all query results in one go, or amount of records if positive number.

### Fields / renaming

Fields defined in fourth argument is a dictionary where keys are expected to be symbol vector. Keys define query field names. Dictionary values define fields as symbols or expressions from data source (first argument). To rename query field just change dictionary keys as appropriate.

```o
o) t: (+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;("111";"222";"333"));
o) q: ?[ t; (); 0b; `ra`rb`rc`rd!`a`b`c`d ];
o) cq: . q;
o) res: 0N#cq;
o) res
ra rb rc rd
--------------
1  3  6  "111"
2  4  7  "222"
3  5  8  "333"
```

### Table aliases

While field references are unique symbols (e.g. from single source table), underlying query engine is fine with scalar symbols as fields. However queries might be quite complex with exact same field names in different tables. To disambiguate between tables, table aliases are used.

Defining table alias is done via providing not single table in data source, but a two-element list.
First element (symbol) defines alias symbol, second - table, join, etc. data source to bind.

Referencing a field via alias is done via monadic ```~``` with two-element symbol vector.

See:

```o
o) t: (+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;("111";"222";"333"));
o) q: ?[ (`alias;t); (); 0b; `ra`rb`rc`rd!((~`alias`a);(~`alias`b);(~`alias`c);(~`alias`d)) ];
o) cq: . q;
o) res: 0N#cq;
o) res
ra rb rc rd
--------------
1  3  6  "111"
2  4  7  "222"
3  5  8  "333"
```

#### Field expressions

Field definition in queries can contain also various expressions calculated in-flight.

Expressions are defined using functional/"lispy" syntax.

```o
o) t: (+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) 0N#.(?[t;();0b;`d`e!((-:;`a);(+;`b;`c))])
d  e
-----
-1 9
-2 11
-3 13
```

#### Virtual field "i"

In order to identify table rows one can use virtual field \`i. It's merely an automatically generated zero-based index.

```o
o) t: (+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) 0N#.(?[t;();0b;`a`b`c`i!`a`b`c`i])
a b c i
-------
1 3 6 0
2 4 7 1
3 5 8 2
```

#### Constants

Constants can be in place of field, conditions, etc.

```o
o)t: (+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)0N#.(?[t;();0b;`a`b`c`const!(`a;`b;`c;10)])
a b c const
-----------
1 3 6 10
2 4 7 10
3 5 8 10
```

In order to distinguish between symbol constants and fields, symbol constants must be enlisted.
```o
o)t: (+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o)0N#.(?[t;();0b;`a`b`c`const!(`a;`b;`c;,`d)])
a b c const
-----------
1 3 6 d
2 4 7 d
3 5 8 d
```


### Conditions

Attaching conditions to queries is to leave in query results only those records which satisfy condition. If corresponding field contains attribute, it will be used to speed-up query execution.

For example single condition filter:

```o
o) t: (+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;("111";"222";"333"));
o) c: ,(<=;`b;3);
o) 0N#.(?[t;c;0b;`a`b`c!`a`b`c])
a b c
-----
1 3 6
```

_Note a mandatory list enclosure in “c” definition. Condition must be a proper list!_

Conditions may contain field expressions.

```o
o) t: (+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) c: ,(<=;(+;`b;`c);9);
o) 0N#.(?[t;c;0b;`a`b`c!`a`b`c])
a b c
-----
1 3 6
```

#### And/or/not clauses, simplified syntax

Of course single field conditions are not enough, several conditions are trivially created using “&” and “|” dyads in conditions list:

```o
o) sym:`symbol$!10;
o) t:(+:)`a`b`c`d!(1 2 3;`g#`3`4`5;6 7 8;`g#`sym$`3`4`5);
o) c:,(&;(>=;`d;`sym$`3);(<=;`b;,`3));
o) 0N#.(?[t;c;0b;`a`b`c!`a`b`c])
a b c
-----
1 3 6
```

"not" clause is a bit awkward, as ordinary **~** monad does not work here.
Trying to use **~:** as monadic "not" is not possible as it results in "commute" instead.
You need to use special verb **not**.

```o
o) t:(+:)`a`b`c!(!10;0+!10;`symbol$!10);
o) 0N#.(?[t;,(not;(=;`a;6));0b;`a`b`c!`a`b`c])
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
```

Quite common pattern is joining all field conditions with “and” logic, thus a simplified syntax is also supported:

```o
o) t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) c:((<=;`b;4);(>=;`c;7));
o) 0N#.(?[t;c;0b;`a`b`c!`a`b`c])
a b c
-----
2 4 7
```

### Where “subselect”

Another commonly used pattern is “sub-select”. It applies another (sub-select) query to condition as argument. It can be used as seen below:

```o
o) t1: (+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) t2:(+:)`b`c!(,2;,4);
o) c: ,(=;`a;?[t2;();0b;(,`b)!(,`b)]);
o) 0N#.(?[t1; c; 0b; `a`c!`a`c])
a c
---
2 7
```

Pay attention that just a single scalar value is expected as a result of “t2” query, otherwise error occurs.

```o
o) t1: (+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) t2:(+:)`b`c!(!2;!2);
o) c: ,(=;`a;?[t2;();0b;(,`b)!(,`b)]);
o) 0N#.(?[t1; c; 0b; `a`c!`a`c])
** exec error: select exec: scalar expected
```

### Where “in”

Another predicate accepting sub-selects is “in”. It checks that left arg is within right argument set of values (either constant vector or a query).

```o
o) t1: (+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) t2: (+:)`b`c!(1 2;3 4);
o) c: ,(in;`a;?[t2;();0b;(,`b)!(,`b)]);
o) 0N#.(?[t1; c; 0b; `a`c!`a`c])
a c
---
1 6
2 7
```

### Where “like”

“Like” predicate matches against regular expression. Both strings and symbols are supported.

```o
o) t:((+:)`a`d`e`f!(1 2 3;3 4 5;6 7 8;("111";"222";"333")));
o) c: ,(like;`a;"111|222");
o) 0N#.(?[t; c; 0b; `a`f!`a`f])
a f
-------
1 "111"
2 "222"
```

### Where “match”

“Match” is exact equality predicate.

```o
o) t:((+:)`a`d`e`f!(1 2 3;3 4 5;6 7 8;("111";"222";"333")));
o) c: ,(~;`a;"111");
o) 0N#.(?[t; c; 0b; `a`f!`a`f])
a f
-------
1 "111"
```

### Where with generic lambda

Any lambda monad/dyad can be used in-place of predicate. However, it must satisfy following requirements:

For monads:

* support vectors for argument
* return resulting boolean vector of the same length as argument

```o
o) t:(+:)`a`b`c!(1 2 3;0 0N 5;6 7 8);
o) 0N#.(?[t;,(null;`b);0b;(`a`b)!(`a`b)])
a b
----
2 0N
```

For dyads:

* support vectors for left argument
* support either vectors or scalars for right argument (depending on query predicate third parameter)
* return resulting boolean vector of the same length as left argument

```o
o) t:(+:)`a`b`c!(1 2 3;0 1 5;6 7 8);
o) 0N#.(?[t;,({x>y};`a;`b);0b;(`a`b)!(`a`b)])
a b
---
1 0
2 1
```

## Joins

Joining a pair of tables (or table-likes) is a base operation in queries. Single field or several fields to join on are supported. Most often table aliases are required to disambiguate fields.

Inner join is defined using “ij” verb:

```o
o) t1:((+:)`a`b`c!(1 2 3;3 4 5;6 7 8));
o) t2:((+:)`a`d`e`f!(1 2 3;3 4 5;6 7 8;("111";"222";"333")));
o) j: ij[(`t1;t1);(`t2;t2);(~`t1`a;~`t2`a)];
o)0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
a b e f
-----------
1 3 6 "111"
2 4 7 "222"
3 5 8 "333"
```

Inner join has a particular difference from SQL - it does not produce Cartesian product for duplicating ids, it emits first found for second relation.

```o
o) t1:((+:)`a`b`c!(`g#3 2 0;3 4 5;6 7 8));
o) t2:((+:)`a`d`e`f!(`g#2 2 5;13 14 15;16 17 18;("111";"222";"333")));
o) j: ij[(`t1;t1);(`t2;t2);(~`t1`a;~`t2`a)];
o) 0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
a b e  f
------------
2 4 16 "111"
```

It’s strongly recommended to attach attributes for field to join on ahead of time.
If appropriate attribute is not present, query engine will build a temporary one each time query executed.

Multi-column joins are also supported. Same logic about building indices ahead of time / in-time is applied here.

```o
o) t1:((+:)`a`b`c!(3 1 2;3 4 5;6 7 8));
o) t2:((+:)`a`d`e`f!(1 2 3;4 5 3;16 17 18;("111";"222";"333")));
o) @[`t1;,`a`b;~#;`g];
o) @[`t2;,`a`d;~#;`g];
o) j: ij[(`t1;t1);(`t2;t2);((~`t1`a;~`t1`b);(~`t2`a;~`t2`d))];
o) 0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
a b e  f
------------
1 4 16 "111"
2 5 17 "222"
3 3 18 "333"
```

Left join is defined using “lj” verb:

```o
o) t1:((+:)`a`b`c!(3 1 2;3 4 5;6 7 8));
o) t2:((+:)`a`d`e`f!(`g#1 2;13 14;16 17;("111";"222")));
o) j:lj[(`t1;t1);(`t2;t2);(~`t1`a;~`t2`a)];
o) 0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
a b e  f
------------
3 3 0N
1 4 16 "111"
2 5 17 "222"
```

Left join has the same  difference from SQL - it does not produce Cartesian product for duplicating ids, it emits first found for second relation.

```o
o) t1:((+:)`a`b`c!(3 2 0;3 4 5;6 7 8));
o) t2:((+:)`a`d`e`f!(`g#2 2 5;13 14 15;16 17 18;("111";"222";"333")));
o) j: lj[(`t1;t1);(`t2;t2);(~`t1`a;~`t2`a)];
o) 0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
a b e  f
------------
3 3 0N
2 4 16 "111"
0 5 0N
```

It’s strongly recommended to attach attributes for field to join on ahead of time.
If appropriate attribute is not present, query engine will build a temporary one each time query executed.

Multi-column left joins are also supported. Same logic about building indices ahead of time / in-time is applied here.

```o
o) t1:((+:)`a`b`c!(3 2 0;3 4 5;6 7 8));
o) t2:((+:)`a`b`e`f!(3 2 3;3 4 3;16 17 18;("111";"222";"333")));
o) @[`t2;,`a`d;~#;`g];
o) j:lj[(`t1;t1);(`t2;t2);((~`t1`a;~`t1`b);(~`t2`a;~`t2`b))];
o) 0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
------------
3 3 16 "111"
2 4 17 "222"
0 5 0N
```

## Take range (first, last, between)

Take range is given as fifth argument for select to limit records fetch by record index.

To grab first N records from query results, use positive scalar:

```o
o) t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) 0N#.(?[t; (); 0b; `a`c!`a`c; 2])
a c
---
1 6
2 7
```

To grab last N records from query results, use negative scalar:

```o
o) t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) 0N#.(?[t; (); 0b; `a`c!`a`c; -2])
a c
---
2 7
3 8
```

And to grab records within some range, use 2-element vector (from;length):

```o
o) t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) 0N#.(?[t; (); 0b; `a`c!`a`c; 1 2])
a c
---
2 7
3 8
```

And grabbing all records is done using generic null ```0N0``` or empty list or cardinal vector.

```o
o) t:(+:)`a`b`c!(1 2 3;3 4 5;6 7 8);
o) 0N#.(?[t; (); 0b; `a`c!`a`c; 0N0])
a c
---
1 6
2 7
3 8
o) 0N#.(?[t; (); 0b; `a`c!`a`c; ()])
a c
---
1 6
2 7
3 8
```

## Select from select

Selecting from inner select is also supported.

```o
o) t1:((+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;8 9 10));
o) t2: ?[(`t1;t1);();0b;`a`b`c!`a`b`c]
o) c: ,(>=;`a;2);
o) 0N#.(?[t2; c; 0b; `a`c!`a`c])
a c
---
2 7
3 8
```

## Sorting

Sorting query results is done by providing sixth argument to select.
The argument must contain nested list of field to sort with direction.
Like following:

```o
o)t:((+:)`a`b`c!(1 2 3;3 4 5;6 7 8));
o)0N#.(?[t;();0b;`a`c!`a`c;();((>:;`a);(<:;`b))])
a c
---
3 8
2 7
1 6
```

This way monadic **<** means ascending order, **>** - descending.

## Grouping / aggregation

Grouping fields appear in third argument as a dict with keys being resulting field names, values - source fields. Field dict in fourth argument plays different role when grouping dict present. It defines grouping expressions to apply.

E.g.

```o
o) t:((+:)`a`b`c`d!(1 2 2;3 4 4;6 7 7;8 9 10));
o) gf: `a`b`c!`a`b`c; // grouping fields
o) ge: (,`d)!(,(sum;`d)); //grouping expressions
o) 0N#.(?[t;(); gf; ge])
a b c d
--------
1 3 6 8
2 4 7 19
```

Expressions for group dict values are supported. Conventional functional syntax is used.

```o
o) t:(+:)`a`b`c`d!(1 2 2;3 4 4;6 7 7;8 9 10);
o) gf: `a`b!`a`b; // grouping fields
o) ge: (,`e)!(,(sum;(+;`c;`d))); //grouping expressions
o) 0N#.(?[t;(); gf; ge])
a b e
------
1 3 14
2 4 33
```

As for grouping expressions, following list of monads is currently supported and optimized for performance:

| Exp | Meaning |
| --- | --- |
| #:  | count |
| *: | first |
| last | last |
| min | minimum |
| max | maximum |
| sum | sum |
| avg | arithmetic average |

Any other user-defined monads are accepted too, but may lead to slower performance as all intermediate group vectors must be preserved during query processing and more general approach is used:

```o
o) t:((+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;8 9 10));
o) gf: {+/x};
o) 0N#.(?[t;();`a`b`c!`a`b`c;(,`d)!(,(gf;`d))])
a b c d
--------
1 3 6 8
2 4 7 9
3 5 8 10
```

Generic aggregation only (without explicit grouping fields) is done like:

```o
o) t1:((+:)`a`b`c!(1 2 3 2;3 4 5 6;6 7 8 8));
o) 0N#.(?[(`t1;t1);();();`d`e!(({+/x};~`t1`c);({+/x};~`t1`b))])
d  e
-----
29 18
```

Pay attention to empty list in third argument to enable aggregation only.

Aggregation only (without explicit grouping fields) using special monads is done like:

```o
o) t:((+:)`a`b`c`d!(1 2 3;3 4 5;6 7 8;8 9 10));
o) 0N#.(?[(`t1;t1);();0b;`a`b`c`d!((sum;~`t1`a);(avg;~`t1`b);(max;~`t1`c);(min;~`t1`d))])
a b c d
-------
6 4 8 8
```

Getting distinct / unique set of records is another useful query. See yourself:

```o
o)t:((+:)`a`b`c!(1 2 2 3;3 4 4 5;6 5 5 9));
o)0N#.(?[t;(); 1b; ()])
a b c
-----
1 3 6
2 4 5
3 5 9
```

## Upsert

Triad does job similar to SQL "UPDATE OR INSERT ..." expression. It also supports creating new fields besides updating and inserting existing fields.

First argument is expected to be either table or a symbol of table for in-place modification.

Second argument is expected to be a table.

Third argument must be two element list of key symbol vectors. Key field vectors must match in length. First field vector corresponds to first table, second one - to the second table.

_It is recommended to have (composite) index for left table keys. It will speed-up processing._

Let's see some examples:

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
```

## Update

TODO

## Delete

TODO

## SQL-like syntax

select [cols] [by groups] from t [where filters]

```o
o)t:(+:)`a`b`c`d!(!10;!10;!10;!10);
o)select [8] M:min a,max b,last d by c from t where c<100,c>1
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
```
