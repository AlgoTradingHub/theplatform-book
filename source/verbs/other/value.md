# value

Returns value of `x`.

**Syntax:** ```value x; value[x]```

```o
o)value 1
1
o)value 1 2 3
1 2 3
```
```o
o)value `
,`| ,`o`repl!(,`cut!(.o.cut);`opt`version`prompt`ps1`out`xbt`sig`peval`psend`enum2sym`fmt`rapi`inc`connect`takeAtMax`kle..
o)value `.
o   | ,`cut!(.o.cut)
repl| `opt`version`prompt`ps1`out`xbt`sig`peval`psend`enum2sym`fmt`rapi`inc`connect`takeAtMax`klen`keys`vals`syncChan`sr..
```
```o
o)d:`a`s`d!(1 2;3 4;5 6)
a| 1 2
s| 3 4
d| 5 6
o)value d
1 2
3 4
5 6
o)t:+d;
o)value t
1 2
3 4
5 6
o)f:{x+1}
{x+1}
o)value f
,(+;#0;1)
o)
```
