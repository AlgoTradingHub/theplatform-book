# ss

String search

**Syntax:** ```x ss y; ss[x;y]```

Where y: regex, x: string to be searched for matches of y

```o
o)ss["MSFT";"^MS"]
,0
o)ss["MSFT";"[A-Z]"]
0 1 2 3
o)
```
