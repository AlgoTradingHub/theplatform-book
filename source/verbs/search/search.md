# Diadic ? (search)

Searches for the first occurance of its right argument in the left one. Returns position index as a number or null if not found.

**Syntax:** ```x?y; ?[x;y]```

```o
o)1 2 3 4 5 6?3
2
o)1 2 3 4 5 6?9
0N
o)
```

If `x` is a vector, `?` searches for `y` in the left argument.

```o
o)1 2 3?2 3 4
1 2 0N
o)
o)1 2 3?(1;2;3 4)
0
1
2 0N  
o)
```

If `x` is a list of lists and `y` is a simple list, `?` searches for `y` in items of `x`:

```o
o)(1 2 3;(4 5 6))?4 5 6
1
o)
```

::: see
[? (vector conditional)](/verbs/conditional/vcond.md)
[Queries](/queries.md)
:::
