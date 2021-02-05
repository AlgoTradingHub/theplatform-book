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
o)+`a`b!(ts[];(1 2))
a                             b
-------------------------------
2021.02.05D18:51:51.268189289 1
2021.02.05D18:51:51.268189289 2
o)+`a`b!(ts[];(,1 2))
a                             b
---------------------------------
2021.02.05D18:51:56.940587862 1 2
o)
```
