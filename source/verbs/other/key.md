# key

Returns key of x if it is keyed value

**Syntax:** ```key x; key[x]```

It could be used to retrieve all names inside root or any namespace since environment is a dictionary itself

```o
o)key `
``rpl`ps1`out`inc
o)key `.
`symbol$()| ()
o)key `a`s`d!(1 2;3 4;5 6)
`a`s`d
o)key +`a`s`d!(1 2;3 4;5 6)
`a`s`d
o)
```
