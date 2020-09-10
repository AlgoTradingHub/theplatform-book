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

## Monadic

### Monadic plus (flip)

Applied to dict does "flip" operation. That is turns dict into table if shape is ok.

```o
o) +`a`b`c!(1 2;4 5;7 8)
a b c
-----
1 4 7
2 5 8
```

### Monadic minus (negate)

Inverts signs of numbers. Right atomic.

```o
o)-(1 2 3)
-1 -2 -3
```

### Monadic mul (first)

Takes first element in vector/list. Fully atomic.

```o
o)*1 2 3
1
```

### Monadic division (reciprocal)

Calculates reciprocal (1/x) in vector/list. Fully atomic.
Only floats are supported.

```o
o)%1 2 3f
1 0.5 0.3333333333333333
```

### Monadic exc.mark (range)

Generates vector filled with 0..right arg exclusively.

```o
o)!3
0 1 2
```

When applied to dict, returns its keys.

```o
o)!`a`b`c!(1 2;4 5;7 8)
`a`b`c
```

When applied to type spec - returns corresponding internal type id.

```o
o)!`s`int
64
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

### Monadic | (reverse)

Reverses elements order in structure.

```o
o) |1 2 3
3 2 1
```

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

### Monadic , (enlist)

Creates one-element vector/list of its argument.

```o
o) ,1
,1
```

### Monadic ^ (null)

Checks if elements are nulls. Right atomic.

```o
o)^0N 1 2
100b
```

### Monadic # (count)

Returns vector/list/dict length.

```o
o) #1 2 3
3
o)#`a`b`c!(1 2;4 5;7 8)
3
```

### Monadic ? (distinct)

Returns unique elements in original order.

```o
o)? 1 1 2 2 3
1 2 3
```

### Monadic @ (type)

Returns internal type id of argument.

_Avoid relying on these ids in production!!!_

```o
o) @1
80
```

### Monadic "type" function

Returns typespec of its argument.

```o
o) type 1
`s`long
```

### Monadic < (grade up)

Returns indices to ascending order sorted vector.

```o
o) <3 2 1 0N 0W -0W
3 5 2 1 0 4
```

### Monadic > (grade down)

Returns indices to descending order sorted vector.

```o
o) >3 2 1 0N 0W -0W
4 0 1 2 5 3
```

### Monadic $ (to string)

Converts arg to text representation. Right atomic.

```o
o)$(1.0;`a;1 2 3)
"1"
"a"
("1";"2";"3")
```

## Dyadic

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

### Dyadic mul

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

### Dyadic exc.mark (map)

Makes dict from left and right arguments.

```o
o)`a`b`c!1 2 3
a| 1
b| 2
c| 3
```

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

### Dyadic , (concat)

Joins left and right arguments together.

```o
o) 1,1 2 3
1 1 2 3
o) 1 2 3,1 2 3
1 2 3 1 2 3
```

### Dyadic # (take/filter)

Takes first N elements or produce vector/list of required length if left argument is integer.

```o
o) 3#0
0 0 0
o) 2#1 2 3
1 2
```

... or filters according to left boolean vector.

```o
o)010b#1 2 3
,2
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

### Dyadic _ (drop/cut)

Removes first N or last elements if left arg is integer.

```o
o)1_1 2 3 4
2 3 4
o)-1_1 2 3 4
1 2 3
o)1_`a`b`c!1 2 3
b| 2
c| 3
```

... or drops position in right argument.

```o
o)1 2 3 4_2
1 2 4
o)1 2 3 4_-2
1 2 4
```

... cuts vector into peaces by indices:

```o
o)0 3 7_0 1 2 3 4 5 6 7 8
0 1 2
3 4 5 6
7 8
```

### Dyadic $ (cast)

Converts right arg values according to left arg specification.
See [Types, Casting, etc](./types.md) for details.

### Dyadic ? (random/pick/find)

If left argument is positive integer scalar, it generates random number sequence with left argument size and within \[0;right argument) range. Hence it's "random" verb.

```o
o)10?20
11 15 19 4 19 8 11 6 4 5
```

Special case of "random" verb is generating GUIDs.

```o
o)2?0Ng
1d289538-0f89-47bd-9891-4b12adef0ef3 f7d6170a-4d90-4984-93dc-71f640abfe41
```

If left argument is positive integer scalar and right argument is vector, it generates random number sequence with left argument size using right argument elements. Hence it's "pick" verb.

```o
o)10?1 2 3
2 2 1 2 1 2 2 1 1 1
```

If left argument is vector, it searches for right arg inside left arg.

```o
o)1 2 3? 2 3 4
1 2 0N
o)
```

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

## Triadic

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


### Triad ? (vector conditional)

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

## Tetradic

For table specific applications, see [Tables](./tables.md)

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

## Polyadic
