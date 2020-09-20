# + Add, Flip

## Add

**Syntax:** ```x+y, +[x;y]```

Where x and y are scalars or vectors, returns theirs sum.

```o
o)1+2
3
o)2+3 4 5
5 6 7
```

## + Flip

**Syntax:** ```+t```

Where t - one of: table, list, dict

```o
o)+(1 2;3 4;5 6)
1 3 5
2 4 6
o)t:+`a`s`d!(1 2 3;4 5 6;7 8 9)
a s d
-----
1 4 7
2 5 8
3 6 9
o)+t
a| 1 2 3
s| 4 5 6
d| 7 8 9
o)
```
