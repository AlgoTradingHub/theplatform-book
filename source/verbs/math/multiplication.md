### Dyadic multiplication

Multiplies scalar/vector elements. Fully atomic.

**Syntax:** ```x*y; *[x;y]```

```
o)2*2
4
```
```
o)2 * 1 2 3
2 4 6
```
```
o)1 2 3 * 2
2 4 6
```
```
o)1 2 3 * 4 5 6
4 10 18
```
```
o)1 2 3 * 4 5 6 7
** exec error: `*` length: [1 2 3;4 5 6 7]
```

