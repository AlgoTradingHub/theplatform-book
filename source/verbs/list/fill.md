# Dyadic ^ (fill)

Replaces nulls in it's right argument by vаlue provided in a left argument

**Syntax:** ```x^y; ^[x;y]```

```o
o)10^1 2 3 0N 4 0N 6
1 2 3 10 4 10 6
o)
```


Fill with scan replace nulls with last non-null item

```o
o)^\1 2 3 0N 4 0N 6
1 2 3 3 4 4 6
o)^\0N 0N 1 2 3 0N 4 0N 6
0N 0N 1 2 3 3 4 4 6
o)5 ^\ 0N 0N 1 2 3 0N 4 0N 6
5 5 1 2 3 3 4 4 6
o)
```

::: see
[^ (null)](/verbs/relational/nullhandling.md)
[iterators](/iterators.md)
:::
