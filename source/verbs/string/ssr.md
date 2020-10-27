# ssr

String search and replace

**Syntax:** ```ssr[x;y;z]```

Where:

- `x` is a string to be searched for matches;
- `y` is a regex for search;
- `z` is a string to substitute matches, or lambda to be called on each matching substring.

```o
o)ssr["ababa galamaga";"[bg]a";"*"]
"a** *lama*"
o)ssr["ababa galamaga";"[bg]a";{0N!x;"*"}]
"ba"
"ba"
"ga"
"ga"
"a** *lama*"
o)ssr["rent a tent";" ";"0"]
"rent0a0tent"
o)
```

::: see
[like](/verbs/string/like.md)
[ss (string search)](/verbs/string/ss.md)
:::
