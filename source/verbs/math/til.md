# til !

Returns a range of natural numbers from 0 til the argument (excluding the argument).

**Syntax:** ```!x; ![x]; til x; til[x]```

```o
o)til 1b
,0
o)!10
0 1 2 3 4 5 6 7 8 9
o)til 0
`long$()
o)10+til 5
10 11 12 13 142
o)(til 2)*5
0 5
o)!2*5
0 1 2 3 4 5 6 7 8 9
o)
```

The argument must be a non-negative integer atom:

```o
o)til 10f
** exec error: `key` nyi: [10f]
```
