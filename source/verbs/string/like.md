# Dyadic like

Returns boolean where `x` matches [regex](/regex.md) in `y`. `x` can be a symbol atom, a list of symbols, a string, or a list of strings. `y` must be a string. `like` is case-sensitive.

**Syntax:** ```x like y; like[x;y]```

```o
o)"asd" like "A"
0b
o)"asd" like "a"
1b
o)`asd like "a"
1b
o)("asd";"asfs";"sfh") like "a"
110b
o)("asd";"asfs";"sfh") like "asd"
100b
o)"dark" like "[bd]ark"
1b
o)"darker" like "dark*"
1b
o)
```

If `y` is a substring of `x` or matches it, `like` returns `1b`. If `x` is a substring of `y`, `like` returns `0b`:

```o
o)"darker" like "dark"
1b
o)"dark" like "darker"
0b
o)
```

::: see
[ss (string search)](/verbs/string/ss.md)
[ssr (string search and replace)](/verbs/string/ssr.md)
:::
