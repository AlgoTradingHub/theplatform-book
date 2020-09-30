# Verbs

Verb is synonim for built-in function.
Monadic, dyadic, triadic, tetradic and polyadic verbs expect 1,2,3,4 and at max 8 parameters respectively.

Given that the same verb might be used in both monadic and dyadic context, dyadic context is assumed by default and monadic can be forced by:

```o
o) (-:)1 2 3
-1 -2 -3
```

Some verbs are atomic. Fully atomic verbs descend into nested lists.

```o
o)(1;(1;1 1;2);3)>(1;2;3)
0b
(0b;00b;0b)
0b
```

A right atomic verb descends only into nested lists of its right argument.

## Indexing Verbs

### Dyadic @ (at)

Index left arg vector/list/dict by right arg.

```o
o)1 2 3@0 1
1 2
o)(`a`b!1 2)@`b`a`c
2 1 0N
```

### Dyadic . (dot-apply)

Index left arg vector/list/dict in depth by right arg.

```o
o)(1 2;3 4).(0 1)
2
```

## Conditional Verbs

### Triad $ (cond)

Short-circuit conditional expression. Thus this verb is special. It does not evaluate all of its arguments immediately.
Only first argument is evaluated, and if it's corresponds to truth then second argument is evaluated and becomes the result of cond expression. Otherwise, third argument is evaluated.

The concept of truth here is a bit complex. It has following rules:

* For boolean scalars, truth means 1b.
* For integer scalars, truth means any value except 0 and null.
* For other scalar types, truth means any non-null value.
* For vectors, dicts, tables, truth means non-empty structure.
* Everything else (monads, dyads, lambdas, ...) results in truth.

```o
o)$[1=1;2;3]
2
```

Another thing to remember is that simulation of short circuit evaluation of condition itself is done using nested conds:

```o
o) a:1 2 3;
o) $[a;$[1=a[0];2;3];4]
2
```

### Triadic ? (vector conditional)

Verb returns value made of second or third argument depending on first boolean scalar or vector argument.
Think about vector if-then-else expression. Boolean truth results in second argument usage, false - in third one.

First scalar boolean is the same condition expression.
```o
o)?[1b;1;2]
1
o)?[0b;1;2 2 3]
2 2 3
```

First vector boolean is much more useful. Second and third argument should have compatible types. All arguments must have the same shape.

```o
o)?[011b;2 2 3;1 1 1]
1 2 3
o)?[001b;1;(2;"123";3)]
2
"123"
1
```

## Relational Verbs

### Dyadic < (less) and <= (less or equal)

Does per element "less" comparison. Fully atomic.

```o
o) 1 0 3 < 1
101b
```

### Dyadic > (greater) and >= (greater or equal)

Does per element "greater" comparison. Fully atomic.

```o
o) 1 0 3 > 1
001b
```

### Dyadic = (equal)

Does per element "equal" comparison. Fully atomic.

```o
o) 1 0 3 = 1 2 3
101b
```

### Dyadic ~ (match)

Does "deep"/recursive "equal" comparison.

```o
o) 1 0 3 ~ 1 2 3
0b
o) 1 2 3 ~ 1 2 3
1b
```

### Dyadic <> (not equals)

Reversed result of equals

**Syntax:** ```x<>y; <>[x;y]```

```o
o)1<>2
1b
o)
```

## Logical Verbs

### Monadic ~ (not)

Inverts boolean vector. Right atomic.

```o
o) ~1010b
0101b
```

... or checks for zeroes otherwise:

```o
o)~1 0 3f
010b
```

### Dyadic | (or/max)

Applies boolean "or" for bool args. Fully atomic.

```o
o) 1b|010b
111b
```

For number vectors, it results in calculating "max".

```o
o) 1 2 3|0
1 2 3
```

### Dyadic & (and/min)

Applies boolean "and" for bool args. Fully atomic.

```o
o) 010b&1b
010b
```

For number vectors, it results in calculating "max".

```o
o) 1 2 3&0 2 1
0 2 1
```

### Monadic & (where)

Returns integer vector of true positions in boolean vectors.

```o
o) &0101b
1 3
```

When applied to integer vector, generates N indices of corresponding elements.

```o
o)&1 2 3
0 1 1 2 2 2
```

## Casts

### Dyadic $ (cast)

Converts right arg values according to left arg specification.
See [Types, Casting, etc](/reference/types/types.md) for details.

## Search Verbs

### Diadic ? (search)

Searches an first occurance of it's right argument in a left one and
returns position index as a number or nill if not found

**Syntax:** ```x?y; ?[x;y]```

```o
o)1 2 3 4 5 6?3
2
o)1 2 3 4 5 6?9
0N
o)
```

If left argument is vector, it searches for right arg inside left arg.

```o
o)1 2 3? 2 3 4
1 2 0N
o)
```

## Null Handling (^)

Checks if elements are nulls. Right atomic.

```o
o)^0N 1 2
100b
```

## Type Verbs

### Monadic @ (type)

Returns internal type id of argument.

_Avoid relying on these ids in production!!!_

```o
o) @1
80
```

### Monadic "type" Function

Returns typespec of its argument.

```o
o) type 1
`s`long
```

### Monadic !

When applied to type spec - returns corresponding internal type id.

```o
o)!`s`int
64
```

## Math Verbs

### Monadic minus (negate)

Inverts signs of numbers. Right atomic.

```o
o)-(1 2 3)
-1 -2 -3
```

### Monadic division (reciprocal)

Calculates reciprocal (1/x) in vector/list. Fully atomic.
Only floats are supported.

```o
o)%1 2 3f
1 0.5 0.3333333333333333
```

### Dyadic plus

Adds scalar/vector elements. Fully atomic.

```o
o) 1+1
2
o) 1+1 2 3
2 3 4
```

### Dyadic minus

Subtracts scalar/vector elements. Fully atomic.

```o
o) 1-1
0
o) 1-1 2 3
0 -1 -2
```

### Dyadic multiplication

Multiplies scalar/vector elements. Fully atomic.

```o
o) 1*1
1
o) 1*1 2 3
1 2 3
```

### Dyadic division

Divides scalar/vector elements. Fully atomic.

```o
o) 1%1
1
o) 1%1 0 2
1 0W 0
```

### More Math Functions

Following fully atomic monadic intrinsics are supported.

| Name | Function | Comment |
| --- | --- |--- |
| sin | sine | argument in radians |
| asin | arcsine | returns radians |
| cos | cosine |argument in radians |
| acos | arccosine |returns radians |
| tan | tangent |argument in radians |
| atan | arctangent |returns radians |
| exp | e^x | Raise e to x power |
| log | ln x | Natural logarithm of x |
| sqrt | sqrt | Square root of x |

Another set of dyadic fully atomic intrinsics are supported.

| Name | Function | Comment |
| --- | --- |--- |
| xexp | x^y | Raise x to a power y |
| xlog | logx(y) | Returns base-x logarithm of y |

## Set verbs

A standard set functions are implemented for simple vectors. That is vectors are treated as sets of values. No attributes are expected to be attached to input vectors. No particular order is guaranteed.

### Intersection

Set intersection is ```sect``` dyadic verb. Works by leaving only those values present in both left and right arguments simultaneously.

```o
o) 0 1 2 3 4 sect 4 0
0 4
```

### Difference

Set difference is ```diff``` dyadic verb. Works by returning those values which present in left argument and not in right one.

```o
o) 0 1 2 3 4 diff 4 0
1 2 3
```

### Union

Set union is ```union``` dyadic verb. Works by returning those values which present in left argument and right one.

```o
o) 1 2 3 4 union 4 0
1 2 3 4 0
```

### "In" / contains

```in``` dyadic verb works by returning boolean 1's for each right value which present in left argument.

```o
o) 1 2 3 in 3 4 5
001b
```

## Bitwise Verbs

### Bitwise AND (band)

**Syntax:** ```x band y; band[x;y]```

```o
o)1 band 2
3
o)
```

### Bitwise NOT (bnot)

**Syntax:** ```bnot x; bnot[x]```

```o
o)bnot 2
-3
o)
```

### Bitwise OR (bor)

**Syntax:** ```x bor y; bor[x;y]```

```o
o)0 bor 1
1
o)
```

### Bitwise XOR (bxor)

**Syntax:** ```x bxor y; bxor[x;y]```

```o
o)0 bxor 1
1
o)
```

## Database IO

One of important features is database persistance. Conceptually, there are two kinds of persistance in O language - reading/writing entire files from/to disk and projecting vectors/tables directly from disk.

The first kind is easier and more powerful as it support more O types.
The second kind is often faster and more memory-efficient, but supports only a subset of O structures - vectors of simple/fixed types, dicts and tables.

### Reading/writing concept

It's done using ```get``` and ```set``` verbs.

The simpliest example is generating a vector and saving it to disk via ```set``` dyad. Later we can read it.
```o
o) a:!10; f:`:./tmp/test.dat; f set a;
o) b:get f
o) b
0 1 2 3 4 5 6 7 8 9
```

Pay attention to the format of left argument for ```set``` - it's a symbol whose first character is ":", followed by directory and ending with filename with any extension.

_It is important to remember - ```set``` verb changes its behaviour based on format of its left argument._

The same idea goes for complex / nested list.
```o
o) a:(!10; "123"; `symbol; `a`b`c!1 2 3); f:`:./tmp/test.dat; f set a;
o) b:get f
o) b
0 1 2 3 4 5 6 7 8 9
"123"
`symbol
(`a`b`c!1 2 3)
```

### Projecting files concept

In order to use projecting into memory, structure must fit into flat vectors of fixed-sized elements.

This concept is served via another pair of verb - ```set``` and ```load```. But only for vectors, dicts and tables.

So the first part is the same - that is saving vector / table to disk. But projecting part itself is done via ```load``` verb. After projecting one can apply destructive amend verbs for changing vector contents right on disk. Assigning anything to projected vector varible completes projection and flushes changes to disk.

```o
o) a:!10; f:`:./tmp/vec.dat; f set a;
o) load f;
o) @[`vec;!10;:;10#1]; vec:0;
o) b:get f; b
1 1 1 1 1 1 1 1 1 1
```

Another way of projecting files is working via amends/dmends. Note trailing slash! Basically, it's just the same projecting/flushing under the hood, but done automatically.

```o
o) a:`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:./tmp/o_dict/; f set a; a:0;
o) @[f;`d`e;:;(10#1;20#2)];b:get f; b
a| 1 2 3
b| 1 2 3
c| 1 2 3
d| 1 1 1 1 1 1 1 1 1 1
e| 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
```

Quite similar to dicts is projecting tables. Note trailing slash!

```o
o) a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:./tmp/o_table/; f set a; a:0;
o) @[f;`e`d;:;(3#1;3#2)]; b:get f; b
a b c e d
---------
1 1 1 1 2
2 2 2 1 2
3 3 3 1 2
```

Of course, projecting via ```load``` verb works for tables as well.

Conceptually only updating and concatenation at the end is allowed for working with tables on disk.

```o
o) a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:./tmp/o_table/; f set a; a:0;
o) .[f;();,;(10 10;20 20;30 30)];
o) b:get f; b
a  b  c
--------
1  1  1
2  2  2
3  3  3
10 20 30
10 20 30
```

## Amends/Dmends

### Triad @ (amend)

Applies monadic verb (third argument) to first argument indexed by second one.

```o
o)a:1 2 3; @[a;2;{x+1}]
1 2 4
```

For destructive updates use variable symbol:

```o
o)a:1 2 3; @[`a;2;{x+1}]
`a
o)a
1 2 4
```

### Triad . (dmend)

Applies monadic verb (third argument) to first argument indexed in depth by second one.

```o
o)a:(1 2 3;4 5 6); .[a;0 1;{x+1}]
1 3 3
4 5 6
```

For destructive updates use variable symbol:

```o
o)a:(1 2 3;4 5 6); .[`a;0 1;{x+1}]
`a
o)a
1 3 3
4 5 6
```

### Tetradic @ (amend)

Applies dyadic verb (third argument) to first argument indexed by second one.

```o
o)a:1 2 3; @[a;2;+;1]
1 2 4
```

For destructive updates use variable symbol:

```o
o)a:1 2 3; @[`a;2;+;1]
`a
o)a
1 2 4
```

### Tetradic . (dmend)

Applies dyadic verb (third argument) to first argument indexed in depth by second one.

```o
o)a:(1 2 3;4 5 6); .[a;0 1;+;1]
1 3 3
4 5 6
```

For destructive updates use variable symbol:

```o
o)a:(1 2 3;4 5 6); .[`a;0 1;+;1]
`a
o)a
1 3 3
4 5 6
```
