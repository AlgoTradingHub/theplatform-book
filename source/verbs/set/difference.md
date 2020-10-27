# Difference

**Syntax:** ```x diff y; diff[x;y]```

Set difference is a dyadic verb. Returns values which appear in `x` but not in `y`.

```o
o)0 1 2 3 4 diff 4 0
1 2 3
o)`a`b`c diff `b`v
`a`c
o)(0 1; 2; 3 5 6) diff (-3 -2 -1;0 1; 2 3 4)
2
3 5 6
o)
```
