# < Asc, Lower

## Asc

Returns positions of elements of it's argument such as
they will be placed in ascending sorted order

**Syntax:** ```<x; <[x]```

```o
o)<2 9 8 7 6 5 0 9 8
6 0 5 4 3 2 8 1 7
o)
```

## Lower

Compares two values and checks if right one is greater then a left one

**Syntax:** ```x<y; <[x;y]```

```o
o)1<2
1b
o)2<1
0b
o)2<1 2 3 1 0
00100b
o)
```
