# til

Returns a range of natural numbers from 0 til the argument (excluding the argument).

**Syntax:** ```til x; til[x]```

```o
o)til 10
0 1 2 3 4 5 6 7 8 9
o)til 0
`long$()
o)10+til 5
10 11 12 13 14
```

The argument must be a non-negative integer atom:

```o
o)til 10f
** exec error: `key` nyi: [10f]
stack backtrace:
     0: {eval parse["REPL";x]}
     1: {r:@[{eval parse["REPL";x]};x;sig];out[r]}
     2: {[x:rpl] inc[x]}
```
