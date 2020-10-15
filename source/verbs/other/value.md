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
   | `symbol$()!()
rpl| &ltReagent#0&gt
ps1| {print["\x1b[1;93;48mo)\x1b[0m"]}
out| {$[0=@x;0N0;0N!x]; ps1[]}
sig| {$[``dict~type x;$[null[|/x[`kill`exit]];0N0;'x];println["\x1b[91m%";x]]}
inc| {r:@[{eval parse["REPL";x]};x;sig];out[r]}
d  | `a`s`d!(1 2;3 4;5 6)
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
