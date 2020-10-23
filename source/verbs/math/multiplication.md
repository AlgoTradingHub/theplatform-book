# Dyadic multiplication

Multiplies scalar/vector elements. Fully atomic.

**Syntax:** ``x*y; *[x;y]``

```o
o)2*2
4
o)2*1 2 3
2 4 6
o)1 2 3*2
2 4 6
o)1 2 3f * 1.1
1.1 2.2 3.3000000000000003
o)1 2 3*4 5 6
4 10 18
o)1 2 3*4 5 6 7
** exec error: `*` length: [1 2 3;4 5 6 7]
```

Where `x` is a dictionary and `y` is a numeric value, the numeric values of `x` are multiplied by `y`:

```o
o)`a`b`c!5 10 20f*1.1
a| 5.5
b| 11
c| 22
o)
```
