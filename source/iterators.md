# Adverbs

Adverbs are high order constructions that modify the way a verb is applied to data.

## Each monad

Applies monadic in the left argument to each element of the right structure.

```o
o){x+1}'4 5 6
5 6 7
o)
```

## Each dyad

Applies dyad to each pair of left and right arguments' elements.

```o
o)1 2 3 +' 4 5 6
5 7 9
o)
```

## Each prior

Applies dyad to subsequent pairs of right argument structure.

```o
o)+':1 2 3
1 3 5
o)
```

... beware of edge cases though:

```o
o){y}':,1
,0N
o){y}':1 2
0N 1
o)
```

## Each prior with initial value

Same as above, but the left argument defines initial value.

```o
o)10*':1 2 2
10 2 4
o)
```

## Each right

Applies dyad to each pair of the left argument and right argument elements.

```o
o)1+/:1 2 3
2 3 4
o)
```

## Each left

Applies dyad to each pair of the left argument elements and right argument.

```o
o)1 2 3+\:1
2 3 4
o)
```

## Over aka fold

Reduces right argument structure using left dyad. Initial value is different for some verbs.

```o
o)+/1 2 3
6
o)
```

Boolean vectors behave as vectors of long for some verbs:

```o
o)+/101b
2
o)
```

```o
o)+/0#0
0
o)
```

However:

```o
o)*/0#0
1
o):/0#0
0N
o)
```

## Over with initial value

Folds right argument structure using left dyad. Initial value is given explicitly:

```o
o)10*/1 2 2
40
o)
```

## Over "converge"/"fixedpoint"

Repeatedly applies monadic function the left argument until result stops changing:

```o
o){x%2}/100
0
o)
```

## Scan

Acts pretty much the same as "over", but returns a structure of the same size.

```o
o)+\1 2 3
1 3 6
o)+\011b
0 1 2
o)
```

## Scan with initial value

"Scan" but with explicitly given initial value.

```o
o)10*\1 2 2
10 20 40
o)
```

## "For" loop

Applies monadic verb to the right argument left argument times.

```o
o)5{x+1}/10
15
o)
```

## "While" loop

Applies monadic verb to the right argument while the left argument returns true value.

```o
o){x&lt100}{x*2}/1
128
o)
```

## Scan "For" loop

Applies monadic verb to the right argument left argument times.

```o
o)5{x+1}\10
10 11 12 13 14 15
o)
```

## Scan "While" loop

Applies monadic verb to the right argument while the left argument returns true value.

```o
o){x&lt100}{x*2}\1
1 2 4 8 16 32 64 128
o)
```

## Scan "converge"/"fixedpoint"

Repeatedly applies monadic function in the left argument to the right one, until result stops changing and accumulates all intermediate results:

```o
o){x%2}\100
100 50 25 12 6 3 1 0
o)
```

## Commute

Transforms dyadic to have its left and right argument swapped.

```o
o)4~,1 2 3
1 2 3 4
o)
```

Amend/dmend also support commute dyads:

```o
o)a:!5
0 1 2 3 4
o).[a;();~_;-2]
0 1 2
o)
```
