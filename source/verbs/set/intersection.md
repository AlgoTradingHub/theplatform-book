# Intersection

A standard set functions are implemented for simple vectors. That is vectors are treated as sets of values. No attributes are expected to be attached to input vectors. No particular order is guaranteed.

Set intersection is ```sect``` dyadic verb. Works by leaving only those values present in both left and right arguments simultaneously.

**Syntax:** ```x sect y; sect[x;y]```

```o
o)0 1 2 3 4 sect 4 0
0 4
o)`a`b`c sect `b`v
,`b
o)(0 1; 2; 3 5 6) sect (-3 -2 -1;0 1; 2 3 4)
,0 1
o)
```
