# Adverbs

Adverbs are high order constructions taking some verb + data and applying verb to data in some way.

## Each monad

Applies monadic left argument to each element of right structure.

```o
o) {x+1}'4 5 6
5 6 7
```

## Each dyad

Applies dyad to each pair of left and right arguments elements.

```o
o) 1 2 3 +' 4 5 6
5 7 9
```

## Each prior

Applies dyad to subsequent pairs of right argument structure.

```o
o) +':1 2 3
1 3 5
```

... beware of edge cases though:

```o
o) {y}':,1
,0N
o) {y}':1 2
0N 1
```

## Each prior with initial value

Same as above, but left argument defines initial value.

```o
o) 10*':1 2 2
10 2 4
```

## Each right

Applies dyad to each pair of left argument and right argument elements.

```o
o) 1+/:1 2 3
2 3 4
```

## Each left

Applies dyad to each pair of left argument elements and right argument.

```o
o) 1 2 3+\:1
2 3 4
```

## Over aka fold

Reduces right argument structure using left dyad. Initial value is different for some verbs.

```o
o) +/1 2 3
6

```
Boolean vectors behave as vector of long for some verbs:

```o
o) +/101b
2
```

```o
o) +/0#0
0
```

However:

```o
o) */0#0
1
o) :/0#0
0N
```

## Over with initial value

Folds right argument structure using left dyad. Initial value is given explicitly:

```o
o)10*/1 2 2
40
```

## Over "converge" / "fixedpoint"

Repeatedly applies left argument monadic function until result stops changing:

```o
o){x%2}/100
0
```

## Scan

Does pretty much the same as "over", but returns same-sized structure.

```o
o) +\1 2 3
1 3 6
o) +\011b
0 1 2
```

## Scan with initial value

"Scan" but with explicitly given initial value.

```o
o)10*\1 2 2
10 20 40
```

## "For" loop

Applies monadic verb to right argument left argument times.

```o
o) 5{x+1}/10
15
```

## "While" loop

Applies monadic verb to right argument while left argument returns true value.

```o
o) {x&lt100}{x*2}/1
128
```

## Scan "For" loop

Applies monadic verb to right argument left argument times.

```o
o)5{x+1}\10
10 11 12 13 14 15
```

## Scan "While" loop

Applies monadic verb to right argument while left argument returns true value.

```o
o){x&lt100}{x*2}\1
1 2 4 8 16 32 64 128
```

## Scan "converge" / "fixedpoint"

Repeatedly applies left argument monadic function until result stops changing and accumulates all intermediate results:

```o
o){x%2}\100
100 50 25 12 6 3 1 0
```

## Commute

Transforms dyadic to have its left and right argument swapped.

```o
o)4~,1 2 3
1 2 3 4

```
Amend/dmend also support commute dyads.

```o
o)a:!5
o)a
0 1 2 3 4
o).[a;();~_;-2]
0 1 2
```
