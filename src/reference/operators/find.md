# ? Distinct, Find, Select

## Distinct

Returns unique set of elements from it's argument

**Syntax:** ```?x; ?[x]```

```o
o)?1 2 3 1 2 1 2
1 2 3
o)
```

## Find

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
