# ~ Not, Commute, Alias, Match

## Not

Toggles it's argument

**Syntax:** ```~x; ~[x]```

```o
o)~1
0b
o)~0
1b
o)
```

## Commute

Creates special verb - commute, that changes arguments of it's verb on call

**Syntax:** ```~[x]```

Where x: dyadic function

```o
o)9(~[,])/:1 2 3 4
1 9
2 9
3 9
4 9
o)~[,][9;1 2 3 4]
1 2 3 4 9
o)9(~[,])/:1 2 3 4
1 9
2 9
3 9
4 9
o)
```
