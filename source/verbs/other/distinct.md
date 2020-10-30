# Distinct

Returns unique set of elements from it's argument.

**Syntax:** ```?x; ?[x]```

```o
o)?1 2 3 1 2 1 2
1 2 3
o)
```

Returns unique rows for tables:

```o
o)t:([]a:1 2 3 3;b:1.1 2.2 1.5 1.5)
a b
-----
1 1.1
2 2.2
3 1.5
3 1.5
o)distinct t
a b
-----
1 1.1
2 2.2
3 1.5
o)
```
