# ^ Null, Fill

## Null

Checks whether it's argument is null

**Syntax:** ```^x; ^[x]```

```o
o)^1
0b
o)^0
0b
o)^0N0
1b
o)^0N0 1
10b
o)
```

## Fill

Replaces nulls in it's right argument by value provided in a left argument

**Syntax:** ```x^y; ^[x;y]```

```o
o)1^1 2 3 0N 4 5 6
1 2 3 1 4 5 6
o)
```
