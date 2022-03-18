# ss

String search. Returns an int vector of position(s) of first element(s) of substrings in `x` that match pattern `y`.

**Syntax:** ```x ss y; ss[x;y]```

Where `y` is a [regex](/regex.md), `x` is a string to be searched for matches of `y`.

```o
o)ss["MSFT";"^MS"]
,0
o)ss["MSFT";"[A-Z]"]
0 1 2 3
o)s:"rent a tent"
"rent a tent"
o)s ss "ent"
1 8
o)s ss "[rt]ent"
0 7
o)
```

::: see
[like](/verbs/string/like.md)
[ssr (string search and replace)](/verbs/string/ssr.md)
:::
