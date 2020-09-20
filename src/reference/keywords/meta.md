# meta

Meta information about table. Returns two cells list contains indexes and info

**Syntax:** ```meta x; meta[x]```

```o
o)t:+`a`s`d!(1 2 3;1 2 3f;`a`s`d)
a s d
-----
1 1 a
2 2 s
3 3 d
o)meta t
+`column`type`id!(`a`s`d;`long`float`symbol;45376 45632 46337)
()
o)first meta t
column type   id
-------------------
a      long   45376
s      float  45632
d      symbol 46337
o)
```
