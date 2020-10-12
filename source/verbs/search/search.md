# Diadic ? (search)

Searches an first occurance of it's right argument in a left one and
returns position index as a number or nill if not found

**Syntax:** ```x?y; ?[x;y]```

```o
o)1 2 3 4 5 6?3
2
o)1 2 3 4 5 6?9
0N
o)
```

If left argument is vector, it searches for right arg inside left arg.

```o
o)1 2 3? 2 3 4
1 2 0N
o)
```

::: ref
    [? (vector conditional)](/verbs/conditional/vcond.md)
    [Queries](/queries.md)
:::

::: info
    [? (vector conditional)](/verbs/conditional/vcond.md)
    [Queries](/queries.md)
:::
