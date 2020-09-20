# like

Returns boolean where x matches regex in y

**Syntax:** ```x like y; like[x;y]```

```o
o)"asd" like "A"
0b
o)"asd" like "a"
1b
o)("asd";"sdfs") like "a"
10b
o)
```
