# key

Returns keys of `x` if it is a keyed value.

**Syntax:** ```key x; key[x]```

It can be used to retrieve all names inside root or any namespace since environment is a dictionary itself.

```o
o)a:42
42
o)key `
``a
o)key `.
o   | `cut`upper`lower`compress`decompress!(.o.cut;.o.upper;.o.lower;.o.compress;.o.decompress)
repl| `opt`version`prompt`ps1`out`xbt`sig`peval`psend`enum2sym`fmt`rapi`inc`connect`takeAtMax`klen`keys`vals`syncChan`sr..
o)key `a`s`d!(1 2;3 4;5 6)
`a`s`d
o)key +`a`s`d!(1 2;3 4;5 6)
`a`s`d
o)
```
