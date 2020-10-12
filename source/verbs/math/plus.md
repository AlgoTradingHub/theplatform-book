### Dyadic plus

Adds scalar/vector elements. Fully atomic.


**Syntax:** ``x+y, +[x;y]``

Where x and y are scalars or vectors, returns theirs sum.

```o
o)1 + 2
3
o)2 + 3 4 5
5 6 7
o)1 2 3 + 4
5 6 7
o)1 2 3 + 4 5 6
5 7 9
o)1 2 3 + 4 5 6 7
** exec error: `+` length: [1 2 3;4 5 6 7]
```

