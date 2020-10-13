# ssr

String search and substitute

**Syntax:** ```ssr[x;y;z]```

Where:

- `x` is a string to be searched for matches;
- `y` is a regex for search;
- `z` is a string to substitute matches or lambda to be called on each matched substring.

```o
o)ssr["ababa galamaga";"[bg]a";"*"]
"a** *lama*"
o)ssr["ababa galamaga";"[bg]a";{0N!x;"*"}]
"ba"
"ba"
"ga"
"ga"
"a** *lama*"
o)
```
