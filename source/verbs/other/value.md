# value

Value of x

**Syntax:** ```value x; value[x]```

```o
o)value 1
1
o)value 1 2 3
1 2 3
o)value `
`symbol$()!()
<reagent[0]>
{print["\x1b[1;93;48mo)\x1b[0m"]}
{$[0=@x;;0N!x]; ps1[]}
{r:@[{eval parse["REPL";x]};x;{println["\x1b[91m%";x]}];out[r]}
{a:x+1;b:a*2;c:b-1;c}
o)value `.
()
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
o)
```
