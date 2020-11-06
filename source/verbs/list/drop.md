# _ Drop, Cut

## Drop

Returns subset of items from a list, vector or dict starting with the item under index `x` (starting from the end if `x` is a negative number)

**Syntax:** ```x _ y; _[x;y]```

```o
o)1 _ 1 2 3
2 3
o)2 _ 1 2 3
,3
o)-1 _ 1 2 3
1 2
o)d
a| 1
a| 1
b| 2
o)-1 _ d
a| 1
a| 1
o)t:([]a:1 2 3 3;b:1.1 2.2 1.5 1.5)
a b
-----
1 1.1
2 2.2
3 1.5
3 1.5
o)2 _ t
a b
-----
3 1.5
3 1.5
o)
```

## Cut

Cuts a list or a vector into parts. Only positive indices supported.

**Syntax:** ```x _ y; _[x;y]```

```o
o)2 4 6 _ til 10
2 3
4 5
6 7 8 9
o)
```
