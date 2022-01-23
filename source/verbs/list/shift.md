# Shift

Shifts elements in a list y. Positive x means shift to the left, negative - to the right.
Null are shifted in from the other end.

**Syntax:** ```x shift y ; shift[x;y]```

```o
o) 1 shift 1 2 3
2 3 0N
o)v:("123";1 2 3;1f);
o).[`v;();~[shift];-1];
o)v
0N0
"123"
1 2 3
```
