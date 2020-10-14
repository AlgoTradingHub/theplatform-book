# flip

Returns x transposed, where x may be a list of lists, a dictionary or a table.

**Syntax:** ```flip x; flip[x]```

```o
o)flip (1 2 3;4 5 6;7 8 9)
1 4 7
2 5 8
3 6 9
o)flip `a`s`d!(1 2 3;4 5 6;7 8 9)
a s d
-----
1 4 7
2 5 8
3 6 9
o)flip flip `a`s`d!(1 2 3;4 5 6;7 8 9)
a| 1 2 3
s| 4 5 6
d| 7 8 9
o)
```
