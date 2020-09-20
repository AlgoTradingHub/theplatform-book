# ' Each, EachBoth

Applies monadic left argument to each element of right structure.

**Syntax:** ```x'y; x'[y]```

```o
o){x+1}'4 5 6
5 6 7
o){x+1}'[4 5 6]
5 6 7
o)
```

## EachBoth

Applies dyad to each pair of left and right arguments elements.

**Syntax:** ```x y'z; z y'[z]```

```o
o)1{x+y}'[4 5 6]
5 6 7
o)1 2 3{x+y}'[4 5 6]
5 7 9
o)
```
