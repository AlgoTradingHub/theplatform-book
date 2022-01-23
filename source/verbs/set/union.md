# Union

Set union is a dyadic verb. Returns all values from both arguments once.

**Syntax:** ```x union y; union[x;y]```

```o
o)1 2 3 4 union 4 0
1 2 3 4 0
o)distinct 10 12 31 31 65, 12 14 65 81      // same as distinct on join
10 12 31 65 14 81
o)
```
