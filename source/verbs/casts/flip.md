# flip

Returns `x` transposed, where `x` may be a list of lists, a dictionary or a table.

**Syntax:** ```flip x; flip[x]; +x; +[x]```

```o
o)flip (1 2 3;4 5 6;7 8 9)
1 4 7
2 5 8
3 6 9
o)+`a`s`d!(1 2 3;4 5 6;7 8 9)
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

::: note
The flip verb automatically extends non-enlisted scalars.
:::

```o
o)+`a`b!(1;(1;2))
a b
---
1 1
1 2
o)+`a`b!(1;,1 2)
a b
-----
1 1 2
o)+`a`b!(`c;(1 2))
a b
---
c 1
c 2
o)+`a`b!(`c;(,1 2))
a b
-----
c 1 2
o)
```
