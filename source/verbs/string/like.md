# like

Returns boolean where `x` matches regex in `y`. `x` can be a symbol atom, a list of symbols, a string, or a list of strings. `like` is case-sensitive,

**Syntax:** ```x like y; like[x;y]```

```o
o)"asd" like "A"
0b
o)"asd" like "a"
1b
o)("asd";"asfs";"sfh") like "a"
110b
o)("asd";"asfs";"sfh") like "asd"
100b
o)
```
