# Set verbs 

A standard set functions are implemented for simple vectors. That is vectors are treated as sets of values. No attributes are expected to be attached to input vectors. No particular order is guaranteed.

## Intersection
Set intersection is ```sect``` dyadic verb. Works by leaving only those values present in both left and right arguments simultaneously.
```o
o) 0 1 2 3 4 sect 4 0
0 4
```

## Difference 
Set difference is ```diff``` dyadic verb. Works by returning those values which present in left argument and not in right one.
```o
o) 0 1 2 3 4 diff 4 0
1 2 3
```

## Union
Set union is ```union``` dyadic verb. Works by returning those values which present in left argument and right one.
```o
o) 1 2 3 4 union 4 0
1 2 3 4 0
```

## "In" / contains
```in``` dyadic verb works by returning boolean 1's for each right value which present in left argument.
```o
o) 1 2 3 in 3 4 5
001b
```
