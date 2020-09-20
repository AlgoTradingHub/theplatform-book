# ': EachPrior

Applies dyad to subsequent pairs of right argument structure.

**Syntax:** ```x':y; x':[y]```

```o
o)+':1 2 3
1 3 5
o)1{x+y}':4 5 6
5 9 11
o){y}':,1
,0N
o){y}':1 2
0N 1
```

Same as above, but left argument defines initial value:

```o
o)10*':1 2 2
10 2 4
```
