# ! Til, Key, Dict

## Til

Returns first N natural numbers, specified in it's argument

**Syntax:** ```!x; ![x]```

```o
o)!5
0 1 2 3 4
o)
```

## Key

Takes key of it's value

**Syntax:** ```!x; ![x]```

Where x: any keyed value

```o
o)!`a`s`d!(1 2;3 4;5 6)
`a`s`d
o)![+`a`s`d!(1 2;3 4;5 6)]
`a`s`d
o)! `
`repl`ps1`out`inc`l
o)
```

## Dict

Creates a dict from two lists: keys and values

**Syntax:** ```x!y; ![x;y]```

Where x,y: lists of the same length

```o
o)`a`s`d!(1 2;3 4;5 6)
a| 1 2
s| 3 4
d| 5 6
o)
```
