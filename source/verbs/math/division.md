### Dyadic division

Divides scalar/vector elements. Fully atomic.

**Syntax:** ```x%y; %[x;y]```

Where x,y: scalars or vectors

```o
o)1%2
0
o)2%2
1
o)2%1
2
o)2f%2f
1f
o)2f%3f
0.6666666666666666
o)2f%3 5 4 3 2f
0.6666666666666666 0.4 0.5 0.6666666666666666 1
o)
```

