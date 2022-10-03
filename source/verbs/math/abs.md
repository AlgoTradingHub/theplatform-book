# Monadic absolute vаlue

Returns the absolute vаlue of a numeral or temporal, returns null for null.

**Syntax:** ```abs x; abs[x]```

```o
o)abs 1.0 -10.5 0
1 10.5 0
o)abs -11:08
11:08
```

`abs` is fully atomic:

```o
o)abs (1;-2 3;-4 5 6.0)
1
2 3
4 5 6f
```
