# each

Applies dyadic function one-by-one element in a right argument

**Syntax:** ```f each x; each[f;x]```

```o
o){x+1} each 1 2 3
2 3 4
o)each[{x+1};1 2 3]
2 3 4
o)
```
