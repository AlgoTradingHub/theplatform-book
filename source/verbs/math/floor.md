# Floor

`floor` returns the greatest integers less or equal to the argument.

**Syntax:** ```floor x; floor [x]```

```o
o)floor 10.5
10f
o)floor -10.5
-11f
o)floor -2.5 0 2.5
-3 0 2
```

The function is atomic:

```o
o)floor(2.3 4.5;6.7)
2 4f
6f
```
