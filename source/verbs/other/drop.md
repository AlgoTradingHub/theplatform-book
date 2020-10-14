# _ Drop, Cut

## Drop

Drops items from a list, vector or dict

**Syntax:** ```x _ y; _[x;y]```

```o
o)1 _ 1 2 3
2 3
o)2 _ 1 2 3
,3
o)-1 _ 1 2 3
1 2
o)
```

## Cut

Cuts a list or a vector into parts

**Syntax:** ```x _ y; _[x;y]```

```o
o)2 4 6 _ til 10
2 3
4 5
6 7 8 9
o)
```
